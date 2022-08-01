// import Cookies from 'js-cookie'

const TokenKey = 'loho3Token'
const MenuKey = 'loho3Menu'

//token
export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

//菜单(权限)
export function getMenu() {
  return localStorage.getItem(MenuKey)
}

export function setMenu(menu) {
  return localStorage.setItem(MenuKey, menu)
}

export function removeMenu() {
  return localStorage.removeItem(MenuKey)
}

//权限2
export function getPermission() {
  return localStorage.getItem('Permission')
}

export function setPermission(perm) {
  return localStorage.setItem('Permission',perm)
}

export function removePermission() {
  localStorage.removeItem('Permission')
}

//用户名
export function getUserName() {
  return localStorage.getItem('username')
}
export function setUserName(name) {
  return localStorage.setItem('username', name)
}
export function removeUserName() {
   localStorage.removeItem('username')
}

//用户图标
export function getAvatar() {
  return localStorage.getItem('avatar');
}
export function setAvatar(avatar) {
  return localStorage.setItem('avatar', avatar)
}
export function removeAvatar() {
   localStorage.removeItem('avatar')
}




