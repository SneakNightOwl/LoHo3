<template>
  <div class="wrap">
    <!-- 商品详情 -->
    <!-- 图片 s-->
    <div class="wrap-left">
      <div class="img-box">
        <img :src="imgsrc" alt="">
      </div>
      <ul class="bullet-con">
        <li class="bullet" v-for="(item, i) in imgList" :key="i" @mouseover="switchPic(item)">
          <img :src="item" alt="">
        </li>
      </ul>
    </div>
    <!-- eve是覆盖在图片上的一层触发遮罩 -->
    <div class="eve" @mousemove="enlargement"></div>
    <!-- 图片 e-->
    <!-- 介绍s -->
    <div class="wrap-right">
    </div>
    <!-- 介绍e -->
    <!-- 放大镜s -->
    <div class="big-con">
      <img :src="bigSrc" ref="big">
    </div>
    <!-- 放大镜e -->
    <!-- 遮罩层s -->
    <div class="mask" ref="mask"></div>
    <!-- 遮罩层e -->
  </div>
</template>
<script>
import { getClothesDetail } from './../../api/overviewProduction';
export default {
  name: 'production-detail',
  components: {},
  data() {
    return {
      pid: '',
      imgsrc: '', //左侧图片
      imgList: [], //图片合集
      bigSrc: '', //放大镜用的图片
      cSizeList: [], //尺寸列表
    };
  },
  created() {
    console.log(this.$route);
  },
  mounted() {
    this.getDetail();
  },
  // computed:{

  // },
  methods: {
    async getDetail() {
      let pid = this.$route.params.pid;
      this.pid = pid;
      let res = await getClothesDetail({ id: pid });
      console.log(res);
      this.cSizeList = res.data.sizeList;
      this.imgList = res.data.picList;
      this.imgsrc = this.imgList[0]; //默认展示第一张图片
      this.bigSrc = this.imgList[0];
    },
    switchPic(str) {
      this.imgsrc = str;
      this.bigSrc = str; //放大镜图片
    },
    //放大
    enlargement(event) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      // console.log(mask.offsetWidth);
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      //约束范围
      if (left <= 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top <= 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      // if(right>)
      mask.style.left = left +'px';
      mask.style.top = top + 'px';
      big.style.left = -2 * left + 'px'; //注意这个倍数
      big.style.top = -2 * top + 'px';
      // console.log(left);
    },
  },
};
</script>
<style lang="less" scoped>
.wrap {
  min-height: 100%;
  color: #666666;
  font: normal 16px Microsoft YaHei;
  background: #fff;
  position: relative;
}
/*左侧的图片 */
.img-box {
  img {
    width: 400px;
    height: 400px;
    box-shadow: 0 2px 7px #999999;
  }
}
.eve {
  // width: 100%;
  // height: 100%;
  width: 400px;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}
.bullet-con {
  display: flex;
  flex-direction: row;
  width: 400px;
  flex-wrap: wrap;
  .bullet {
    width: 70px;
    height: 70px;
    margin-left: 12px;
    margin-top: 6px;
    box-shadow: 0 2px 7px #999999;
    img {
      width: 70px;
      height: 70px;
    }
    &:hover {
      box-shadow: 0 2px 7px #02598f;
      cursor: pointer;
    }
  }
  .bullet:nth-of-type(1),
  .bullet:nth-of-type(6) {
    margin-left: 0;
  }
}
.mask {
  width: 200px;
  height: 200px;
  background-color: rgba(171, 250, 171, 0.3);
  position: absolute;
  left: 0;
  top: 0;
  display: none;
}
.big-con {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 0;
  left: 400px;
  // border: 1px solid #aaa;
  overflow: hidden;
  z-index: 5;
  display: none;
  background: white;

  img {
    width: 800px;
    max-width: 800px;
    height: 800px;
    position: absolute;
    left: 0;
    top: 0;
  }
}
.eve:hover ~.mask,
.eve:hover ~.big-con {
  display: block;
}
</style>