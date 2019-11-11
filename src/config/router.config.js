import { UserLayout, BlankLayout, RouteView, BasicLayout } from "@/layouts";

export const asyncRouterMap = [
  {
    path: "/",
    name: "index",
    component: BasicLayout,
    meta: { title: "首页" },
    redirect: "/dashboard/workplace",
    children: [
      // dashboard
      {
        path: "/dashboard",
        name: "dashboard",
        redirect: "/dashboard/workplace",
        component: RouteView,
        meta: {
          title: "仪表盘",
          keepAlive: true,
          icon: "table",
          permission: ["dashboard"]
        },
        children: [
          {
            path: "/dashboard/analysis",
            name: "Analysis",
            component: () => import("@/views/dashboard/Analysis"),
            meta: {
              title: "分析页",
              keepAlive: false,
              permission: ["dashboard"]
            }
          },
          // 外部链接
          {
            path: "https://www.baidu.com/",
            name: "Monitor",
            meta: { title: "监控页（外部）", target: "_blank" }
          },
          {
            path: "/dashboard/workplace",
            name: "Workplace",
            component: () => import("@/views/dashboard/Workplace"),
            meta: {
              title: "工作台",
              keepAlive: true,
              permission: ["dashboard"]
            }
          }
        ]
      }
    ]
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

export const constantRouterMap = [
  {
    path: "/user",
    component: UserLayout,
    redirect: "/user/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Login")
      },
      {
        path: "register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Register")
      },
      {
        path: "register-result",
        name: "registerResult",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/RegisterResult")
      },
      //忘记密码
      {
        path: "recover",
        name: "recover",
        component: undefined
      }
    ]
  },

  {
    path: "/test",
    component: BlankLayout,
    redirect: "/test/home",
    children: [
      {
        path: "home",
        name: "TestHome",
        component: () => import("@/views/Home")
      }
    ]
  },

  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "fail" */ "@/views/exception/404")
  }
];
