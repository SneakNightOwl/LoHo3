'use strict';

import Vue from 'vue';
import axios from 'axios';
import { Message } from 'element-ui';

let config = {
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60 * 1000,
  // withCredentials: true,
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function(response) {
    // Cookies.remove('jumpLoginFlag');
    if (response.data.code && response.data.code !== '0000') {
      if (response.data.code === '0012') {
        Message.error({
          message: '服务器出现未知错误,正在排查问题',
          showClose: true,
          duration: 0,
        });
      } else {
        Message.error('服务器出现未知错误,正在排查问题');
      }
    }
    return response.data;
  },
  function(error) {
    // if (error.response && error.response.status === 301) {
    //   if (Cookies.get('jumpLoginFlag')) {
    //     Message.error('请手动点击退出，重新登录');
    //   } else {
    //     Cookies.set('jumpLoginFlag', 'true');
    //     let loginHost = process.env.VUE_APP_LOGIN_URL,
    //       returnUrl = window.location.href;
    //     window.location.href = `${loginHost}/login?service=${config.baseURL}/login?returnUrl=${returnUrl}`;
    //   }
    // } else {
    //   Message.error(error.message);
    //   return Promise.reject(error);
    // }
    Message.error(error.message);
      return Promise.reject(error);
  }
);

// Plugin.install = function(Vue, options) {
//   Vue.axios = _axios;
//   window.axios = _axios;
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios;
//       },
//     },
//     $axios: {
//       post() {
//         return _axios;
//       },
//     },
//   });
// };

// Vue.use(Plugin);

export default _axios;