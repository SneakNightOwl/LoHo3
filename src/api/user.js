import request from '@/utils/request';

//登录页面
//post请求
//登录 获取token
export function issignin(data) {
  return request({
    url: '/users/issignin',
    method: 'post',
    data
  })
}
//登录 获取权限相关
export function getInfo(data) {
  return request({
    url: '/users/getInfo',
    method: 'post',
    data
  })
}
//登出
export function logout(data) {
  return request({
    url: '/users/logout',
    method: 'post',
    data
  })
}   
