"use strict";(self["webpackChunkloho3"]=self["webpackChunkloho3"]||[]).push([[452],{9452:function(e,s,o){o.r(s),o.d(s,{default:function(){return c}});var i=function(){var e=this,s=e.$createElement,o=e._self._c||s;return o("div",{staticClass:"login"},[o("el-col",{staticClass:"middle-con",attrs:{span:10}},[o("el-form",{ref:"loginForm",staticClass:"login-fm",attrs:{"label-position":e.labelPosition,"label-width":"80px",model:e.loginForm,rules:e.rules}},[o("el-form-item",{attrs:{label:"用户名",prop:"nickname"}},[o("el-input",{model:{value:e.loginForm.nickname,callback:function(s){e.$set(e.loginForm,"nickname",s)},expression:"loginForm.nickname"}})],1),o("el-form-item",{attrs:{label:"密码",prop:"password"}},[o("el-input",{model:{value:e.loginForm.password,callback:function(s){e.$set(e.loginForm,"password",s)},expression:"loginForm.password"}})],1),o("el-button",{staticClass:"sub-btn",on:{click:function(s){return e.loginSub("loginForm")}}},[e._v("提 交")])],1)],1)],1)},n=[],l=o(8728);function t(e){return(0,l.Z)({url:"/users/issignin",method:"post",data:e})}var r={name:"login",components:{},data(){return{labelPosition:"right",rules:{nickname:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:15,message:"长度在 3 到 15 个字符",trigger:"blur"}],password:{required:!0,message:"请输入密码",trigger:"blur"}},loginForm:{nickname:"",password:"",mobile:""}}},methods:{async loginSub(e){this.$refs[e].validate((e=>{if(!e)return!1;{let e={username:this.loginForm.nickname,password:this.loginForm.password,cellphone:this.loginForm.mobile};this.subData(e)}}))},async subData(e){let s=await t(e);if(console.log(s),s&&s.success){this.$message({message:"登陆成功",type:"success"});let e=JSON.parse(JSON.stringify(s.user));this.$store.commit("login",e),setTimeout((()=>{this.$router.push({name:"Layout"})}),1500)}}}},a=r,m=o(1001),u=(0,m.Z)(a,i,n,!1,null,"04b2a68d",null),c=u.exports}}]);
//# sourceMappingURL=452.0af96973.js.map