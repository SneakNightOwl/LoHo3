<template>
  <div class="Layout">
    <div class="top-nav clearfix">
      <div class="logo-con L">
        <router-link to="/" class="logo-lk">
          <img class="logo" :src="logoUrl" alt="">
        </router-link>
      </div>
      <div class="menu-con L">
        <el-menu :default-active="activeIndex" class="el-menu-demo top-lev-menu" mode="horizontal" @select="handleSelect" v-if="region==1">
          <el-menu-item index="1" class="menu-btn">文章管理中心</el-menu-item>
          <el-menu-item index="2" class="menu-btn">控制台</el-menu-item>
          <!-- <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
        </el-menu>
      </div>

      <div class="user-con clearfix" @mouseenter="mo=1" @mouseleave="mo=0">
        <div class="block L">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
        </div>
        <div class="block L">
          <p class="user-tit fB">
            用户
          </p>
          <p class="user-tit user-name">
            {{username}}
          </p>
        </div>
        <div :class="[mo==1?'info-open':'info-hide']">
          <!-- <div class="info-open">  -->
          <div class="info-des">
            杭州XX公司
          </div>
          <div class="btn-con">
            <el-button class="logout-btn" @click="logout">退出登录</el-button>
          </div>
        </div>
      </div>

    </div>
    <!-- 侧栏 -->
    <el-row class="tac side-wrapper">
      <el-col :span="4">
        <!-- 文章管理中心 -->
        <el-menu :default-active="defaultPath" router class="el-menu-vertical-demo side-nav" @open="arHandleOpen" @close="arHandleClose">
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu>
          <el-menu-item index="15">
            <i class="el-icon-document"></i>
            <span slot="title">导航十五</span>
          </el-menu-item> -->
          <el-menu-item v-for="item in categoryArr" :index="item.path" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <div class="content-container">
            <router-view></router-view>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import { getToken, setToken, removeToken, getMenu, setMenu, removeMenu, getPermission, setPermission, removePermission, getUserName, setUserName, removeUserName, getAvatar, setAvatar, removeAvatar } from '@/utils/auth';
export default {
  name: 'Layout',
  components: {
    //引用的组件
  },
  data() {
    return {
      logoUrl: require('@/assets/images/logo.png'),
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      username: '',
      region: '',
      activeIndex: '',
      // activeIndex2: '1'
      categoryArr: [], //menu数据
      defaultPath: '', //默认打开的页面
      // activeSideNav:'',
      // defaultIndex:'1', //默认高亮的侧边栏导航
      articleArr: [
        //文章管理
        //文章管理-会员中心
        {
          name: '会员中心',
          index: '1',
          icon: 'el-icon-location',
          path: '/article-mng/member-center',
        },
        //文章管理-订单列表
        {
          name: '订单列表',
          index: '2',
          icon: 'el-icon-s-order',
          path: '/article-mng/order-list',
        },
        //文章管理-物流中心
        {
          name: '物流中心',
          index: '3',
          icon: 'el-icon-truck',
          path: '/article-mng/distribution-center',
        },
        //文章管理-产品概览
        {
          name: '产品概览',
          index: '4',
          icon: 'el-icon-present',
          path: '/article-mng/overview-production',
        },
        //
        {
          name: '产品轮播',
          index: '5',
          icon: 'el-icon-shopping-bag-1',
          path: '/article-mng/swiper-production',
        },
        {
          name: '地图中心',
          index: '6',
          icon: 'el-icon-map-location',
          path: '/article-mng/map-center',
        },
      ],
      //控制台
      consoleArr: [
        //控制台-广告中心
        {
          name: '广告中心',
          index: '1',
          icon: 'el-icon-s-order',
          path: '/console-desk/advert-manage',
        },
        //控制台-图片中心
        {
          name: '图片中心',
          index: '2',
          icon: 'el-icon-picture',
          path: '/console-desk/picture-manage',
        },
        //控制台-视频中心
        {
          name: '视频中心',
          index: '3',
          icon: 'el-icon-video-camera-solid',
          path: '/console-desk/video-manage',
        },
      ],
      mo: 0,
    };
  },
  methods: {
    //渲染用户基本数据
    showUser() {
      if (this.$store.state.user && this.$store.state.user != '') {
        let user = this.$store.state.user;
        console.log(user);
        this.username = user.username;
        if (user.permission) {
          if (user.permission['first-menu-ctrl'] != '') {
            this.region = 1;
          } else if (user.permission['second-menu-ctrl'] != '') {
            this.region = 2;
          }
          console.log(this.region);
        }else {
          console.log('region丢失');
          //重新给state.user赋值
          // let permission = getPermission();
          // let avatar = getAvatar();
          // let nickname = getUserName();
          // let token = getToken();
          // this.$store.commit('user/SET_PERMISSION',permission);
          // this.$store.commit('user/SET_AVATAR',avatar);
          // this.$store.commit('user/SET_NAME',nickname);
          // this.$store.commit('user/SET_TOKEN',token);
          //上面这部分代码已经封装进vuex的user模块
          this.$store.dispatch('user/refillUser');
          console.log(this.$store.state.user);
          if (user.permission['first-menu-ctrl'] != '') {
            this.region = 1;
          } else if (user.permission['second-menu-ctrl'] != '') {
            this.region = 2;
          }
        }
      } else {
        // console.log('找不到user');
        // let permission = getPermission();
        // console.log(permission);
        //没有用户数据就回到登录页面重新登录(基本上是刷新页面造成的)
        this.$message.error('登录状态失效，请重新登录');
        setTimeout(() => {
          this.$router.push({ name: 'login' });
        }, 1500);
      }
    },
    //退出登录
    logout() {
      let _this = this;
      _this
        .$confirm('是否退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          this.$store.dispatch('user/logout').then(() => {
            setTimeout(() => {
              this.$router.push({ name: 'login' });
            }, 1500);
          });
        });
    },
    //选择导航
    handleSelect(key, keyPath) {
      console.log(key);
      // this.activeIndex == key;
      // console.log(this.activeIndex);
      if (key == '1') {
        this.activeIndex = '1';
        this.categoryArr = this.articleArr;
        // console.log(this.activeIndex);
      } else {
        this.activeIndex = '2';
        this.categoryArr = this.consoleArr;
        //  console.log(this.activeIndex);
      }
    },
    //文章管理平台 打开-闭合
    arHandleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    arHandleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getTopMenuActiveIndex() {
      console.log(this.$route.path);
      if (this.activeIndex == '' && this.$route.path == this.categoryArr[0].path) {
        this.activeIndex = '1';
      } else {
        //确保刷新后 回到原来的侧导航 并且目标导航高亮
        this.articleArr.forEach((ele) => {
          if (ele.path == this.$route.path) {
            this.activeIndex = '1';
            this.categoryArr = this.articleArr;
          }
        });
        this.consoleArr.forEach((ele2) => {
          if (ele2.path == this.$route.path) {
            this.activeIndex = '2';
            this.categoryArr = this.consoleArr;
            this.defaultPath = this.$route.path;
          }
        });
        // let aPath = '/article-mng';
        // let bPath = '/console-desk';
        // console.log(this.$route.path);
        // if(this.$route.path.indexOf(aPath)>0) {
        //   this.activeIndex = '1';
        //   this.categoryArr = this.articleArr;
        // }else {
        //   // this.activeIndex = '2';
        //   this.categoryArr = this.consoleArr;
        //   // console.log(this.defaultPath);
        //   // console.log(this.$route.path);
        //   // console.log(this.$route.path.indexOf(aPath));
        // }
        // console.log(this.activeIndex);
      }
    },
  },
  created() {
    const routes = this.$router.getRoutes();
    this.categoryArr = this.articleArr; //默认渲染文章管理平台的导航
    // if(this.defaultPath=='') {
    //   this.defaultPath = this.categoryArr[0].path;
    //   console.log(1111);
    // }else {
    //   this.defaultPath = this.$route.path;
    //   console.log(222);
    // }
  },
  mounted() {
    this.showUser();
    //确保刷新后 回到原来的侧导航
    this.defaultPath = this.$route.path;
    this.getTopMenuActiveIndex();
  },
  computed: {},
  watch: {
    // defaultPath(prev) {
    //   if(!prev||prev=='') {
    //     return this.categoryArr[0].path;
    //   }else {
    //     return this.$route.path
    //   }
    // }
    // 'this.$store.state'(newVal, oldVal) {
    //   console.log(newVal,'newVal');
    //   console.log(oldVal,'oldVal');
    //   this.$store.commit('setToken');
    //   this.$store.commit('setName');
    //   this.$store.commit('setPermission');
    // }
  },
};
</script>
<style lang="less" scoped>
//   @baseColor：red;

.Layout {
  //   color: @basecolor;
  height: 100%;
  color: red;
  padding: 61px 0 0;
  box-sizing: border-box;
  div {
    // font-size: 20px;
    // font-weight: bold;
  }

  .top-nav {
    position: relative;
    height: 61px;
    margin-top: -61px;
    box-shadow: 0 1px 1px #dfdfdf;
    z-index: 5;

    .logo-con {
      width: 185px;
      height: 60px;
      padding-right: 100px;
      .logo-lk {
        display: inline-block;
        height: 60px;
        line-height: 60px;
      }
      .logo {
        width: 185px;
        height: 39px;
        vertical-align: middle;
      }
    }

    .top-lev-menu {
      // height: 60px;
      // margin-top: -61px;
      .menu-btn {
        // color:#333333;
        font: bold 20px Arial;
        line-height: 60px;
      }
    }

    .user-con {
      width: 200px;
      position: absolute;
      right: 0;
      top: 5px;

      .user-tit {
        height: 26px;
        color: #333333;
        font: normal 12px Arial;
        line-height: 26px;
        padding-left: 5px;
      }
      .user-name {
        font: bold 16px Arial;
        line-height: 26px;
      }

      // 隐藏信息
      .info-open {
        width: 200px;
        height: 92px;
        // height:0;
        background: #ffffff;
        position: absolute;
        top: 53px;
        right: 15%;
        box-shadow: 1px 1px 3px 1px #dad9d9;
        border-radius: 5px;
        padding: 0 0 10px;
        // visibility: hidden;
        animation: slidOpen 0.5s ease;
        .info-des {
          text-align: center;
          height: 30px;
          padding: 10px 5px 5px;
          color: #666666;
          font: normal 12px Arial;
        }

        .logout-btn {
          display: block;
          margin: 0 auto;
        }
      }
      .info-hide {
        width: 200px;
        height: 0;
        background: #ffffff;
        position: absolute;
        top: 53px;
        right: 15%;
        box-shadow: 1px 1px 3px 1px #dad9d9;
        border-radius: 5px;
        visibility: hidden;
        animation: slidClose 0.5s ease;
        //  height:0;
        // visibility: hidden;
        // opacity: 0;
        .info-des {
          text-align: center;
          height: 30px;
          padding: 10px 5px 5px;
          color: #666666;
          font: normal 12px Arial;
        }

        .logout-btn {
          display: block;
          margin: 0 auto;
        }
      }
      @keyframes slidOpen {
        0% {
          visibility: hidden;
          transform: scaleY(0);
          transform-origin: 0 0;
        }
        100% {
          visibility: visible;
          transform: scaleY(100%);
          transform-origin: 0 0;
        }
      }
      @keyframes slidClose {
        0% {
          visibility: visible;
          transform: scaleY(100%);
          transform-origin: 0 0;
        }
        50% {
          visibility: hidden; //解决下拉框缩回去时会闪一下的bug
        }
        100% {
          height: 0;
          transform: scaleY(0);
          transform-origin: 0 0;
          visibility: hidden;
        }
      }
    }
  }

  .side-wrapper {
    height: 100%;
    > .el-col {
      height: 100%;
    }
  }
  .side-nav {
    height: 100%;
    overflow: auto;
    // min-height:900px;
  }
  .content {
    // padding-left: 200px;
    background-color: #f7faf9;
    overflow-y: auto;
    height: 100%;

    .content-container {
      box-sizing: border-box;
      height: 100%;
      padding: 24px 20px 64px;
      // background: #fff;
    }
  }
}
</style>