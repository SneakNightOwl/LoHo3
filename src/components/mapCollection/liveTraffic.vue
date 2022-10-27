<template>
  <div class="content">
    <div class="amap-wrapper">
      <!-- <el-amap class="amap-box" vid="amapContainer">
      </el-amap> -->
      <div id="amapContainer"></div>
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
      targPosition: [119.98158727605438, 30.278759726274245], //移动的起始地址
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
      //指定地图容器，并做相应的配置
      this.map = new AMap.Map('amapContainer', {
        center: new AMap.LngLat(this.x, this.y),
        zoom: this.zoom, //地图缩放比例设置
      });
      //标记的配置
      let txt = '一家专业的网络技术公司';
      var marker = new AMap.Marker({
        map: this.map, //使用此地图实例
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [this.x, this.y],
        title: 'SJDL网络科技有限公司',
        // anchor:'top-left'
        label: {
          //标注
          content: '<div>' + txt + '</div>',
          direction: 'top',
          offset: new AMap.Pixel(-3, -3), //设置文本标注偏移量
        },
        extData: {
          //自定义属性
          proNo: 203,
          proName: '余杭DL统筹项目',
          cause: '天气过热,需要给员工放假',
        },
      });
      //文本标记
      var text = new AMap.Text({
        position: new AMap.LngLat(119.9805465789566, 30.279056213357162),
        anchor: 'bottom-center',
        text: '华茂科技园',
        style: { 'background-color': 'red' },
      });
      this.map.add(text);
      //实时路况图层
      var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10,
      });
      //使用相关配置
      marker.setMap(this.map);
      this.map.add(trafficLayer); //添加图层到地图
      //事件
      //鼠标移入
      marker.on('mouseover', (e) => {
        let cur = e.target.getExtData(); //获取标记上挂载的数据
        console.log(cur);
      });
      //点击切换文案和样式
      text.on('click', (e) => {
        text.setText('老六科技园');
        text.setStyle({ 'background-color': 'skyblue' });
        let md = text.getAnchor(); //获取标记锚点
        let angle = text.getAngle(); //获取标记旋转角度
        console.log(md); //bottom-center
        console.log(angle);
        if (angle == 90) {
          text.setAngle(0);
        } else {
          text.setAngle(90); //旋转90度 这个旋转角度不会叠加
        }
      });

      let _self = this;
      let targ = this.targPosition;
      let center = this.center;
      const animationMarker = new AMap.Marker({
          // text: '攻城狮',
          position: new AMap.LngLat(119.98158727605438, 30.278759726274245),
          icon: 'https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png',
          offset: new AMap.Pixel(-13, -26),
        });
      //动画
      _self.map.add(animationMarker);
      AMap.plugin('AMap.MoveAnimation', function () {
        animationMarker.moveTo([_self.center[0], _self.center[1]], {
          duration: 5000,
          delay: 500,
        });
        // _self.map.remove(animationMarker);
      });
      //methods
      //动态控制label的显示隐藏
      var logMapChange = () => {
        let mapZoom = _self.map.getZoom(); //获取当前地图级别
        if (mapZoom < 15) {
          hideMarkerLabel(marker);
        } else {
          showMarkerLabel(marker);
        }
      };
      //事件监听一定要放在下面写 否则不生效
      this.map.on('zoomchange', logMapChange);
      //显示label
      var showMarkerLabel = (marker) => {
        marker.setLabel({
          content: '<div>' + txt + '</div>',
          direction: 'top',
          offset: new AMap.Pixel(-3, -3),
        });
        marker.setMap(this.map);
      };
      //隐藏label
      var hideMarkerLabel = (marker) => {
        marker.setLabel({
          content: '',
        });
        // marker.setMap(this.map);
      };
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
  /*自定义marker-label的样式*/
  ::v-deep .amap-marker-label {
    border: none;
    border-radius: 5px;
    padding: 8px;
    color: #999999;
    background: #d4f1f9;
    background: linear-gradient(to bottom, #abe7f7 10%, #d4f1f9 60%, #abe7f7 99%);
    box-shadow: 0 0 3px #666666;
  }
}
.amap-wrapper {
  width: 500px;
  height: 400px;
}
#amapContainer {
  width: 500px;
  height: 400px;
}
</style>