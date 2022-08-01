const fs = require("fs");
const path = require("path");
const { param2Obj } = require('./utils')
const Mock = require("mockjs"); //mockjs 导入依赖模块
const JSON5 = require("json5"); //json5的作用是可以解析json文件中的注释

const user = require('./user');
const overviewProduction = require('./mockApi/clothes.js');

//读取json文件
function getJsonFile(filePath) {
  //读取指定json文件
  var json = fs.readFileSync(path.resolve(__dirname, filePath), "utf-8");
  //解析并返回
  return JSON5.parse(json);
}
 
//返回一个函数
// module.exports = function (app) {
//   if (process.env.MOCK == "true") { 
//     //为了满足当后台有接口的时候，不是使用mock数据，在此处做一个判断，可以在.env文件中对设置
//     //监听http请求
//     app.get("/user/userinfo", function (rep, res) {
//       //每次响应请求时读取mock data的json文件
//       //getJsonFile方法定义了如何读取json文件并解析成数据对象
//       var json = getJsonFile("./userInfo.json5");
//       //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
//       res.json(Mock.mock(json));
//     });
//   }
// };
const mocks = [
  ...user,
  ...overviewProduction
]

function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}