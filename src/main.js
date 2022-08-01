import Vue from 'vue';
import axios from 'axios';
import './utils/request';
import store from './store';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import '../node_modules/swiper/css/swiper.css'; //swiper的样式
// import '@/assets/style/reset.css'
import '@/assets/style/base.css'
import less from 'less';

import '../mock/index';
// require('../mock/index');

Vue.config.productionTip = false

//开发环境使用mockjs
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}


Vue.use(less);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
// Vue.use(Vuex);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
