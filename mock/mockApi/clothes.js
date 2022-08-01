//mockjs里不能直接引用json
const clothesList = [
    {
      id: 1,
      pic: "https://img.alicdn.com/imgextra/i3/17257702/O1CN01l9R7q226lZExFIvWX_!!0-saturn_solar.jpg_468x468q75.jpg",
      tit: '【纯棉】与狼共舞条纹圆领短袖T恤男士2022夏季新款透气休闲上衣',
      des: '',
    },
    {
      id: 2,
      pic: "https://img.alicdn.com/imgextra/i1/95502341/O1CN016duNyq1TADvikfRZ4_!!0-saturn_solar.jpg_468x468q75.jpg",
      tit: '2021时尚潮牌男装个性印花短袖t恤青年韩版修身ins打底小衫男半袖',
      des: '',
    },
    {
      id: 3,
      pic: "https://img.alicdn.com/imgextra/i2/52033263/O1CN018i01wF1ZyV2yQhuGN_!!2-saturn_solar.png_468x468q75.jpg",
      tit: '2022春夏男短袖t韩版修身男纯色小圆领社会小伙紧身T桖打底t桖男',
      des: '',
    },
    {
      id: 4,
      pic: "https://img.alicdn.com/imgextra/i2/25560297/O1CN012DUn0m1E44NTO9Pqr_!!0-saturn_solar.jpg_468x468q75.jpg",
      tit: '【棋盘格】与狼共舞纯棉圆领短袖T恤男士2022夏季新款透气男装短t',
      des: '',
    },
    {
      id: 5,
      pic: "https://img.alicdn.com/imgextra/i4/17257702/O1CN01SBLGcm26lZFCtSWMJ_!!0-saturn_solar.jpg_468x468q75.jpg",
      tit: '硬汉帅炸男款常规短袖亨利领纯棉修身美式休闲舒适纯色上衣T恤',
      des: '',
    },
    {
      id: 6,
      pic: "https://img.alicdn.com/imgextra/i1/215970055/O1CN01JKSDHp1CHES3QV9Zr_!!0-saturn_solar.jpg_468x468q75.jpg",
      tit: '汉佳欧斯 春夏季男士polo衫t恤短袖修身网红潮流拼色口袋男装体恤',
      des: '',
    },
    {
      id: 7,
      pic: "https://img.alicdn.com/imgextra/i2/54762545/O1CN01o1xxlA1UfeeEcEnkI_!!0-saturn_solar.jpg_468x468q75.jpg",
      tit: '2022夏季男短袖青年百搭体恤日系宽松潮流棉圆领印花T恤半袖上衣',
      des: '',
    },
    {
      id: 8,
      pic: "https://img.alicdn.com/imgextra/i4/3008610135/O1CN01zFld2w1CrsEThsk3J_!!0-saturn_solar.jpg_468x468q75.jpg",
      tit: '2022年夏季男士紧身运动V领短袖T恤弹力纯棉低领修身打底纯色定制',
      des: '',
    },
    {
      id: 9,
      pic: "https://img.alicdn.com/imgextra/i1/17693292/O1CN01c1x89s1aBmbP89vmR_!!0-saturn_solar.jpg_468x468q75.jpg",
      tit: '半拉链polo衫短袖男潮牌潮流百搭ins衣服夏季宽松美式日系大码t恤',
      des: '',
    },
    {
      id: 10,
      pic: "https://img.alicdn.com/imgextra/i2/130170944/O1CN011GobTX1IqObgaXTQb_!!0-saturn_solar.jpg_468x468q75.jpg",
      tit: '鄂尔多斯市2022夏季薄款翻领拉链polo衫男士商务纯色桑蚕丝半袖男',
      des: '',
    },
  ];

  //一个衣服的详情里有多个尺寸可以选择
const sizeList = [ 
  {
    id:0,
    price:60,
    tit:'2022春夏男短袖t韩版修身男纯色小圆领社会小伙紧身T桖打底t桖男 ',
    cSize:'M(体重90-105斤左右穿)'
  },
  {
    id:1,
    price:60,
    tit:'2022春夏男短袖t韩版修身男纯色小圆领社会小伙紧身T桖打底t桖男 ',
    cSize:'L (体重105-115斤左右穿)'
  },
  {
    id:2,
    price:60,
    tit:'2022春夏男短袖t韩版修身男纯色小圆领社会小伙紧身T桖打底t桖男 ',
    cSize:'XL (体重115-125斤左右穿)'
  },
  {
    id:3,
    price:60,
    tit:'2022春夏男短袖t韩版修身男纯色小圆领社会小伙紧身T桖打底t桖男 ',
    cSize:'2XL (体重125-135斤左右穿)'
  },
  {
    id:4,
    price:60,
    tit:'2022春夏男短袖t韩版修身男纯色小圆领社会小伙紧身T桖打底t桖男 ',
    cSize:'3XL(体重135-145斤左右穿)'
  },
  {
    id:5,
    price:60,
    tit:'2022春夏男短袖t韩版修身男纯色小圆领社会小伙紧身T桖打底t桖男 ',
    cSize:'4XL【体重145斤-155斤左右穿】'
  },
  {
    id:6,
    price:60,
    tit:'2022春夏男短袖t韩版修身男纯色小圆领社会小伙紧身T桖打底t桖男 ',
    cSize:'5XL【体重155斤-165斤左右穿】'
  }
];
//图片
const picList = [
  "https://gd4.alicdn.com/imgextra/i1/417648386/O1CN01gYE99I2Boq2Ckzux3_!!417648386.jpg_400x400.jpg",
  "https://gd2.alicdn.com/imgextra/i2/417648386/O1CN01ZEfhfa2BoqA0WQU3Z_!!417648386.jpg_400x400.jpg",
  "https://gd4.alicdn.com/imgextra/i4/417648386/O1CN01JZ3M9V2Boq0CCKgiY_!!417648386.jpg_400x400.jpg",
  "https://gd3.alicdn.com/imgextra/i3/417648386/O1CN010SWeFe2BoqAATQ5dR_!!417648386.jpg_400x400.jpg",
  "https://gd2.alicdn.com/imgextra/i2/417648386/O1CN012BopsJsAKYEGmFJ_!!417648386.png_400x400.jpg",
  "https://gd3.alicdn.com/imgextra/i3/417648386/O1CN01rIw66S2BoqAlcpCC8_!!0-item_pic.jpg_400x400.jpg"
]

module.exports = [
  {
    url: '/production/clothesList',
    type: 'get',
    response: (config) => {
      //不知道为什么 这里打印config.headers['token']是undefined
      return {
        code:200,
        data:clothesList
      };
    },
  },
  {
    url:'/production/clothesDetail',
    type:'get',
    response: (config)=>{
      //  var list = sizeList;
       return {
         code:200,
         data:{
            sizeList:sizeList,
            picList:picList
         }
       }
    }
  }
];
