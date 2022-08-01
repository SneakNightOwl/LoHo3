<template>
  <div class="wrap">
    <!-- 产品概览 -->
    <ul class="production-list">
      <li class="pro-li" v-for="(item, i) in clothesList" :key="i">
        <router-link class="pro-itm" :to="{name:'production-detail',params:{pid:item.id}}">
          <img :src="item.pic" alt="">
          <p class="pro-tit">{{item.tit}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getClothesListData } from './../../api/overviewProduction'; //接口
export default {
  name: 'overview-production',
  components: {},
  mixins: [],
  data() {
    return {
      clothesList: [],
    };
  },
  mounted() {
    this.getClothesList();
  },
  methods: {
    async getClothesList() {
      let res = await getClothesListData({ selectId: 103 });
      console.log(res);
      this.clothesList = res.data;
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
  // min-height:70%;
}
.production-list {
  width:100%;
  padding:20px;
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  box-sizing: border-box;
  .pro-li {
    
  }
  .pro-itm {
    display: block;
    width: 200px;
    height: 300px;
    font: normal 12px Microsoft YaHei;
    margin-left:20px;
    > img {
      width: 200px;
      height: 240px;
    }
  }
}
</style>