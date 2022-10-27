<template>
  <div class="wrap">
    <!-- 这里踩了个小坑 element的这种tab切换感觉不是很适合做页面内组件的切换,因为被换掉的组件不会被自动销毁,仍然
    需要v-if来控制组件的显示和隐藏,amap的实例对象一次只能存在一个，否则会报错 -->
    <!-- 唯一省心的是tab的样式不用自己写了 -->
    <el-tabs v-model="activeName" type="card" @tab-click="tabSwitch">
      <el-tab-pane label="基础地图" name="tab0">
         <basisMap v-if="activeName=='tab0'"/>
      </el-tab-pane>
      <el-tab-pane label="实时路况" name="tab1">
        <liveTraffic v-if="activeName=='tab1'"/>
      </el-tab-pane>
      <el-tab-pane label="进阶地图1" name="tab2">进阶地图1</el-tab-pane>
      <el-tab-pane label="进阶地图2" name="tab3">进阶地图2</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import basisMap from './../../components/mapCollection/basisMap.vue'
import liveTraffic from './../../components/mapCollection/liveTraffic.vue'
export default {
  name: 'map-center',
  components: {
    basisMap,
    liveTraffic
  },
  data() {
    return {
       activeName:'tab1'
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    
  },
  methods: {
     tabSwitch(tab) {
       this.activeName = tab.name;
     }
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
  padding:10px;
}
.amap-wrapper {
  width:500px;
  height:400px;
}
</style>