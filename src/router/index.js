import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout';
import { getToken } from  '@/utils/auth';
import { Message } from 'element-ui';

Vue.use(Router)

const constantRoutes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:'/article-mng/member-center',
    children:[
      //文章管理-会员中心
      {
        path: '/article-mng/member-center',
        name: 'member-center',
        component: ()=>import('@/views/article-mng/member-center'),
        meta:{
          permission:'second-menu-ctrl',
          activeMenu:'/article-mng/member-center/'
        }
      },
       //文章管理-订单列表
      {
        path: '/article-mng/order-list',
        name: 'order-list',
        component: ()=>import('@/views/article-mng/order-list'),
        meta:{
          permission:'second-menu-ctrl',
          activeMenu:'/article-mng/order-list/'
        }
      },
       //文章管理-物流中心
      {
        path: '/article-mng/distribution-center',
        name: 'distribution-centrer',
        component: ()=>import('@/views/article-mng/distribution-center'),
        meta:{
          permission:'second-menu-ctrl',
          activeMenu:'/article-mng/distribution-center/'
        }
      },
      //产品概览
      {
        path: '/article-mng/overview-production',
        name: 'overview-production',
        component: ()=>import('@/views/article-mng/overview-production'),
        meta:{
          permission:'second-menu-ctrl',
          activeMenu:'/article-mng/overview-production/'
        }
      },
      //产品详情
      {
        path: 'article-mng/production-detail/:id',
        name: 'production-detail',
        component: ()=>import('@/views/article-mng/production-detail'),
        meta:{
          permission:'second-menu-ctrl',
          activeMenu:'/article-mng/production-detail/'
        }
      },
      //产品-轮播图
      {
        path: 'article-mng/swiper-production',
        name: 'swiper-production',
        component: ()=>import('@/views/article-mng/swiper-production'),
        meta:{
          permission:'second-menu-ctrl',
          activeMenu:'/article-mng/swiper-production/'
        }
      },
      //地图中心
      {
        path: 'article-mng/map-center',
        name: 'map-center',
        component: ()=>import('@/views/article-mng/map-center'),
        meta:{
          permission:'second-menu-ctrl',
          activeMenu:'/article-mng/map-center/'
        }
      },
      //控制台-广告管理
      {
        path: '/console-desk/advert-manage',
        name: 'advert-manage',
        component: ()=>import('@/views/console-desk/advert-manage'),
        meta:{
          permission:'first-menu-ctrl',
          activeMenu:'/console-desk/advert-manage/'
        }
      },
      //控制台-图片管理
      {
        path: '/console-desk/picture-manage',
        name: 'picture-manage',
        component: ()=>import('@/views/console-desk/picture-manage'),
        meta:{
          permission:'first-menu-ctrl',
          activeMenu:'/console-desk/picture-manage/'
        }
      },
      //控制台-视频管理
      {
        path: '/console-desk/video-manage',
        name: 'video-manage',
        component: ()=>import('@/views/console-desk/video-manage'),
        meta:{
          permission:'first-menu-ctrl',
          activeMenu:'/console-desk/video-manage/'
        }
      },
    ]
  },
  //登录
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/login'),
  }
];

// const router =  new Router({
//   mode: 'history',
//   routes
// })
const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter();

//路由重定向
export function resetRouter(){
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;  //reset router
}
// router.beforeEach((to, from, next) => {
//   if (to.meta && to.meta.permission) {
//     if (store.state.permissions && store.state.permissions.indexOf(to.meta.permission) === -1) {
//       Message.error('对不起，您的权限不足');
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
 
 
 router.beforeEach((to,from,next)=>{
    let token = getToken();
    console.log(token);
    if(to.path!=='/login') {
      if(!token) {
        Message.error('登录状态已过期，请重新登录');
        setTimeout(()=>{
          // router.redirect;
          router.push({path:'/login'});
        },1000)
      }else {
        next();
      }
    }else {
      next();
    }
 })

export default router;
