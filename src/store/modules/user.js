import { getToken, setToken, removeToken, getMenu, setMenu, removeMenu, getPermission, setPermission, removePermission, getUserName, setUserName, removeUserName, getAvatar, setAvatar, removeAvatar } from '@/utils/auth';
// import { reject } from 'core-js/fn/promise';
import { resetRouter } from '@/router';
import { issignin, getInfo } from '@/api/user';
// import user from '@/mock/user';

const getDefaultState = () => {
  return {
    name: '',
    avatar: '', //头像图标
    token: '',
    menu: getMenu(),
    // permission: getPermission(),
    permission: '',
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_MENU: (state, menu) => {
    state.menu = menu;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = permission;
  },
};

const actions = {
  async login({ commit }, userInfo) {
    const { nickname, password } = userInfo;
    console.log(userInfo);
    // return new Promise((resolve, reject) => {
    //   issignin({ username: nickname.trim(), password: password })
    //     .then((response) => {
    //       // const { data } = response
    //       console.log(response, '22');
    //       commit('SET_TOKEN', response.data.token);
    //       setToken(response.data.token);
    //       resolve(response.data.token);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
    let res = await issignin({ username: nickname.trim(), password: password });
    console.log(res, 22);
    commit('SET_TOKEN', res.data.token);
    setToken(res.data.token);
    return res.data.token; //返给login页面的函数，相当于promise的resolve
  },
  //获取后端返回的用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ token: state.token })
        .then((response) => {
          const { data } = response;
          // console.log(data);
          if (!data) {
            reject('Verification failed, please Login again');
          }
          const { name, avatar, permissions } = data;
          commit('SET_NAME', name);
          setUserName(name);
          commit('SET_PERMISSION', JSON.stringify(permissions));
          setPermission(JSON.stringify(permissions));
          commit('SET_AVATAR', JSON.stringify(avatar));
          setAvatar(JSON.stringify(avatar));
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  //退出登录(主动)
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken();
      //  removeMenu();
      removeUserName();
      removePermission();
      removeAvatar();
      resetRouter();
      commit('RESET_STATE');
      resolve();
    });
  },
  //token过期重设token
  resetToken({ commit }) {
    return new Promise((resolve, reject) => {
      removeToken();
      //  removeMenu();
      removePermission();
      commit('RESET_STATE');
      resolve();
    });
  },
  //刷新后填充user
  refillUser({ commit }) {
    let permission = getPermission();
    let avatar = getAvatar();
    let nickname = getUserName();
    let token = getToken();
    commit('SET_PERMISSION', permission);
    commit('SET_AVATAR', avatar);
    commit('SET_NAME', nickname);
    commit('SET_TOKEN', token);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
