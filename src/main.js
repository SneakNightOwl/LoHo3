import Vue from 'vue';
import axios from 'axios';
// import VueAMap from 'vue-amap';
// import { lazyAMapApiLoaderInstance } from 'vue-amap'; //用于定制化程度较高的项目
// import AMapLoader from '@amap/amap-jsapi-loader'; //直接调用amap的api
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
// Vue.use(VueAMap);
Vue.prototype.$axios = axios;
// Vue.use(Vuex);

// VueAMap.initAMapApiLoader({
//   key: '0834b833865521c5313f6ef09e00201a',  //高德地图的key
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.MoveAnimation','Geocoder'],
//   v: '1.4.4',// 默认高德 sdk 版本为 1.4.4
//   uiVersion: '1.1.1' // ui库版本，不配置不加载,
// });
// AMapLoader.load({
//   "key": "0834b833865521c5313f6ef09e00201a",              // 申请好的Web端开发者Key，首次调用 load 时必填
//   "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
//   "plugins": ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.MoveAnimation','Geocoder'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
// }).then((AMap)=>{
//   map = new AMap.Map('container');
// }).catch(e => {
//   console.log(e);
// })

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
