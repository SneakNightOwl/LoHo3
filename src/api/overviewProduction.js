import request from '@/utils/request';  //使用封装后的axios

//商品列表-服装
export function getClothesListData(data) {
   return request({
     url:'/production/clothesList',
     method:'get',
     params:data
   })
}
//详情-服装
export function getClothesDetail(data) {
  return request({
    url:'/production/clothesDetail',
    method:'get',
    params:data
  })
}