<template>
  <div class="login">
    <!-- <el-row class="tac middle-con"> -->
    <el-col class="middle-con" :span="10">
      <el-form class="login-fm" :label-position="labelPosition" label-width="80px" :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="nickname">
          <el-input v-model="loginForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="手机号">
            <el-input v-model="loginForm.mobile"></el-input>
          </el-form-item> -->
        <el-button class="sub-btn" @click="loginSub('loginForm')">提 交</el-button>
      </el-form>
    </el-col>
    <!-- </el-row> -->
  </div>
</template>
<script>
// import $axios from '@/plugins/request';
import {issignin} from '../api/user';
export default {
  name: 'login',
  components: {
    //引用的组件
  },
  data() {
    return {
      // baseUrl:GLOBAL.BASE_URL,
      labelPosition: 'right',
      rules: {
        nickname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
        ],
        password: { required: true, message: '请输入密码', trigger: 'blur' },
      },
      loginForm: {
        nickname: '',
        password: '',
        mobile: '',
      },
    };
  },
  methods: {
   async loginSub(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // let baseUrl = this.GLOBAL.BASE_URL;
          //  console.log(this.loginForm);
          let param = {
            username: this.loginForm.nickname,
            password: this.loginForm.password,
            cellphone: this.loginForm.mobile,
          };
          // axios.post(baseUrl + 'api/users/issignin', param).then((res) => {
          // })
          this.subData(param);
        } else {
          return false;
        }
      });
    },
    async subData(param) {
      // let res = await this.$axios({
      //      url:'api/users/issignin',
      //      method:'post',
      //      data:param
      //    });
      let res = await issignin(param);
            console.log(res);
            if (res && res.success) {
              this.$message({
                message: '登陆成功',
                type: 'success',
              });
              // console.log(res.data.user);
              let userobj = JSON.parse(JSON.stringify(res.user));
              this.$store.commit('login', userobj); //同步操作，直接调用mutations里的方法存入state里
              //这里不能用路由来传参，因为layout做了路由重定向
              setTimeout(() => {
                this.$router.push({ name: 'Layout' });
              }, 1500);
            }
          // });
    }
  },
};
</script>
<style lang="less" scoped>
//   @baseColor：red;

.login {
  width: 100%;
  height: 100%;
  //   color: @basecolor;
  color: red;
  position: relative;
  background: linear-gradient(to bottom, #e8f4f5, #6ff1fd);
  div {
    font-size: 20px;
    font-weight: bold;
  }

  .middle-con {
    width:640px;
    height:198px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -172px;
    margin-left: -304px;
    background: #3dc5f7;
    background: linear-gradient(to right bottom, #93ddf8, #6ba1b4);
    border-radius: 10px;
  }

  .login-fm {
    padding: 20px 20px 50px;
    position: relative;
  }
  .sub-btn {
    background: #93ddf8;
    color: #333333;
    border: 1px solid #85c6dd;
    position: absolute;
    right: 20px;
  }
}
</style>