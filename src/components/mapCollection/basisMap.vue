<template>
  <div class="content">
    <div class="amap-wrapper">
      <!-- <el-amap class="amap-box" :vid="'amap-vue'" :center="center"> -->
      <!-- <el-amap class="amap-box" vid="amapContainer">
      </el-amap> -->
      <div id="container"></div>
    </div>
  </div>
</template>
<script>
// import { lazyAMapApiLoaderInstance } from 'vue-amap'; //使用高德地图的sdk
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  name: 'map-center',
  components: {},
  data() {
    return {
      center: [119.97886434579851, 30.278748329816203], //地图中心点坐标
      map: null, //地图实例存储变量
      zoom: 16, //缩放比例
      events: {}, //地图事件
      //精诚电力科技园的经纬度
      x: 119.97886434579851,
      y: 30.278748329816203,
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    AMapLoader.load({
      key: '0834b833865521c5313f6ef09e00201a', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MoveAnimation', 'Geocoder'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        this.initMap(AMap);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    initMap() {
      var map = new AMap.Map('container', {
        center: new AMap.LngLat(this.x, this.y),
        zoom: this.zoom, //地图缩放比例设置
      });
      //标记的配置
      var marker = new AMap.Marker({
        map: this.map, //使用此地图实例
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [this.x, this.y],
      });
      //使用相关配置
      marker.setMap(map);
      map.on('complete', () => {
        // log.success('地图加载完成');
      });
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  // min-height: 100%;
  color: #666666;
  font: normal 16px Microsoft YaHei;
  background: #fff;
  position: relative;
  padding: 10px;
}
.amap-wrapper {
  width: 500px;
  height: 400px;
}
#container {
  width: 500px;
  height: 400px;
}
</style>