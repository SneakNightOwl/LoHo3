export default mutations = {
  //从本地存储中取出token
  GET_TOKEN:(token) => {
    let token = localStorage.getItem('token');
    return token;
  },
  //把token保存在本地
  SAVE_TOKEN:(token) =>{
    localStorage.setItem('token',token);
  },
  //清除本地的token 账号主动下线时用到
  REMOVE_TOKEN:()=> {
    localStorage.removeItem('token');
  }
}