<template>
  <div class="wrap">
    <!-- swiper7以前的默认容器是swiper-container -->
    <!-- 但是这里使用的是vue-awesome-swiper@3.1.3 -->
    <div class="swiper">
      <!-- <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,i) in clothesList" :key="i">
          <img :src="item.pic" alt="">
          <span class="tit">{{item.tit}}</span>
        </div>
      </div>
      <div class="swiper-pagination"></div> -->
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide
         v-for="(item, i) in clothesList"
         :key="i"
        >
          <img :src="item.pic" alt="">
          <span class="tit">{{item.tit}}</span>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper> 
    </div>
  </div>
</template>
<script>
import { getClothesListData } from './../../api/overviewProduction'; //接口
// import Swiper from 'swiper';
import '../../../node_modules/swiper/css/swiper.css'; // 这个路径要自己去node_modules里搜索
import {swiper, swiperSlide} from 'vue-awesome-swiper';
export default {
  name: 'swiper-production',
  components: {
    swiper,
    swiperSlide
  },
  mixins: [],
  data() {
    return {
      pid: '',
      clothesList: [],
      swiperOptions:{
        direction: 'horizontal', //
        autoplay:true,
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getProdctionList();
  },
  methods: {
    async getProdctionList() {
      let res = await getClothesListData({ selectId: '0014' });
      console.log(res);
      this.clothesList = res.data;
      // this.swiperBegin(); //启动轮播图
    },
    // swiperBegin() {
    //   var mySwiper = new Swiper('.swiper-container', {
    //     direction: 'horizontal', //
    //     autoplay:true,
    //     loop: true, // 循环模式选项
    //     // 如果需要分页器
    //     pagination: {
    //       el: '.swiper-pagination',
    //     },
    //     // 如果需要前进后退按钮
    //     navigation: {
    //       nextEl: '.swiper-button-next',
    //       prevEl: '.swiper-button-prev',
    //     },
    //     // 如果需要滚动条
    //     scrollbar: {
    //       el: '.swiper-scrollbar',
    //     },
    //   });
    // },
  },
};
</script>
<style>
/* @import url("../../../node_modules/swiper/css/swiper.css"); */
</style>
<style lang="less" scoped>
.wrap {
  min-height: 100%;
  color: #666666;
  font: normal 16px Microsoft YaHei;
  background: #fff;
  position: relative;
}
.swiper {
  // width: 750px;
  width: 150px;
  height: 300px;
  overflow: hidden;
  // display: flex;
  // flex-direction: row;
  // overflow:hidden;
  .swiper-slide {
    width: 150px;
    height: 220px;
    > img {
      width: 150px;
      height: 200px;
    }
    .tit {
      height: 20px;
      font: normal 12px Microsoft YaHei;
      word-break: break-all;
    }
  }
}
.swiper-pagination {
  width:100%;
  height:20px;
}
</style>