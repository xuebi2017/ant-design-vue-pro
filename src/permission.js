import Vue from "vue";
import router from "./router";
import store from "./store";

import NProgress from "nprogress"; // progress bar
import notification from "ant-design-vue/es/notification";
import { setDocumentTitle, domTitle } from "@/utils/domUtil";
import { ACCESS_TOKEN } from "@/store/mutation-types";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["login", "register", "registerResult"]; // no redirect whitelist
const defaultRoutePath = "/dashboard/workplace";

router.beforeEach((to, from, next) => {
  console.log("TCL: from", from);
  console.log("TCL: to", to);
  NProgress.start(); // start progress bar
  to.meta &&
    (typeof to.meta.title !== "undefined" &&
      setDocumentTitle(`${to.meta.title} - ${domTitle}`));
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    console.log(222);
    //如果tokenStorage中存了token且token未过期，如果访问登录页，跳转到默认首页
    if (to.path === "/user/login") {
      next({ path: defaultRoutePath });
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        //路由守卫里面没有this
        console.log("TCL: this", this);
        store
          .dispatch("GetInfo")
          .then(res => {
            const roles = res.result && res.result.role;
            store.dispatch("GenerateRoutes", { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              console.log(
                "TCL: store.getters.addRouters",
                store.getters.addRouters
              );
              router.addRoutes(store.getters.addRouters);
              const redirect = decodeURIComponent(
                from.query.redirect || to.path
              );
              console.log("TCL: redirect", redirect);
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true });
              } else {
                // 跳转到目的路由
                next({ path: redirect });
              }
            });
          })
          .catch(error => {
            notification.error({
              message: "错误",
              description: "请求用户信息失败，请重试"
            });
            // store.dispatch('Logout').then(() => {
            //   next({ path: '/user/login', query: { redirect: to.fullPath } })
            // })
          });
      } else {
        next();
      }
      // NProgress.done();
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      console.log(111);
      next();
    } else {
      //如果localStorage中不存在token或者token过期，则跳转到登录页，且带上from的路由eg:http://localhost:8080/user/login?redirect=%2Fdashboard%2Fworkplace
      next({ path: "/user/login", query: { redirect: to.fullPath } });
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(route => {
  NProgress.done(); // finish progress bar
});
