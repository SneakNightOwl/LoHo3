<template>
    <div class="Home">
         <div>this is Home Page</div>
    </div>
</template>
<script>
export default {
  name: 'Home',
  components: {
      //引用的组件
    },
    data(){
        return {
            //数据
        }
    },
    methods:{
       
    }
}
</script>
<style lang="less" scoped>
//   @baseColor：red;

  .Home{
    //   color: @basecolor;
    color:red;
      div{
          font-size:20px;
          font-weight: bold;
      }
  }
</style>