import { getToken, setToken, removeToken, getMenu, setMenu, removeMenu, getPermission, setPermission, removePermission } from '@/utils/auth';
// import { reject } from 'core-js/fn/promise';
import { resetRouter } from '@/router';
// import user from '@/mock/user';

const getDefaultState = () => {
  return {
    name: '',
    avatar: '', //头像图标
    token: getToken(),
    menu: getMenu(),
    // permission: getPermission(),
    permission:'',
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
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: password })
        .then((response) => {
          // const { data } = response
          console.log(response.data, '22');
          commit('SET_TOKEN', response.data.token);
          commit('SET_PERMISSION', JSON.stringify(response.data.permission));
          // commit('SET_MENU', JSON.stringify(response.data.menu))
          setToken(response.data.token);
          setPermission(JSON.stringify(response.data.permission));
          // setMenu(JSON.stringify(response.data.menu))
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  //获取后端返回的用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;
          console.log(data);
          if (!data) {
            reject('Verification failed, please Login again');
          }
          const { nickname, avata } = data;
          commit('SET_NAME', nickname);
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
      removePermission();
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
};

export default {
  namespaced:true,
  state,
  mutations,
  actions
};
