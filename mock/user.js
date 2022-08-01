// const Mock = require('mockjs');
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = [
  {
    token:'admin-token', 
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    permissions:{
      "first-menu-ctrl":"first-menu-ctrl"
    }
  },
  {
    token: 'editor-token',
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    permissions:{
      "second-menu-ctrl":"second-menu-ctrl"
    }
  }
]

module.exports = [
  // user login
  {
    url: '/vue-admin-template/users/issignin',
    type: 'post',
    response: config => {
      const { username } = config.body
      const data = tokens[username]

      // mock error
      if (!data) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: data
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/users/getInfo',
    type: 'post',
    response: config => {
      const { token } = config.body;
      // const info = users[token]
      let info;
      users.forEach(ele=>{
        if(ele.token == token) {
          info = ele;
        }
      })

      // mock error
      if (!token) {
        return {
          // query:config.query,
          code: 500,
          message: 'Login failed, unable to get user details.'
        }
      }
      return {
        code: 200,
        data: info
      }
    }
  },
  
  // user logout
  {
    url: 'user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
