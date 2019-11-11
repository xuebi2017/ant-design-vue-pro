const getters = {
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  nickname: state => state.user.name,
  avatar: state => state.user.avatar,
  userInfo: state => state.user.info,
};

export default getters;
