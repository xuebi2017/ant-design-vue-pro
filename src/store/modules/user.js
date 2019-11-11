import Vue from "vue";
import { login, getInfo, logout } from "@/api/login";
import { ACCESS_TOKEN } from "@/store/mutation-types";

const user = {
  state: {
    token: "",
    name: "",
    avatar: "",
    roles: [],
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, { name }) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response.result;
            //设置token的value和过期时间expire{"value":"4291d7da9005377ec9aec4a71ea837f","expire":1573636215793}
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
            commit("SET_TOKEN", result.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        logout(state.token)
          .then(() => {
            resolve();
          })
          .catch(() => {
            resolve();
          })
          .finally(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            Vue.ls.remove(ACCESS_TOKEN);
          });
      });
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const result = response.result;

            if (result.role && result.role.permissions.length > 0) {
              const role = result.role;
              role.permissions = result.role.permissions;
              role.permissions.map(per => {
                if (
                  per.actionEntitySet != null &&
                  per.actionEntitySet.length > 0
                ) {
                  const action = per.actionEntitySet.map(action => {
                    return action.action;
                  });
                  per.actionList = action;
                }
              });
              role.permissionList = role.permissions.map(permission => {
                return permission.permissionId;
              });
              commit("SET_ROLES", result.role);
              commit("SET_INFO", result);
            } else {
              reject(new Error("getInfo: roles must be a non-null array !"));
            }

            commit("SET_NAME", { name: result.name });
            commit("SET_AVATAR", result.avatar);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default user;
