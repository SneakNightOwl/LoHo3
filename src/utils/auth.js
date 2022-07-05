// import Cookies from 'js-cookie'

const TokenKey = 'loho3Token'
const MenuKey = 'loho3Menu'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getMenu() {
  return localStorage.getItem(MenuKey)
}

export function setMenu(menu) {
  return localStorage.setItem(MenuKey, menu)
}

export function removeMenu() {
  return localStorage.removeItem(MenuKey)
}

export function getPermission() {
  return localStorage.getItem(Permission)
}

export function setPermission(perm) {
  return localStorage.setItem(Permission,perm)
}

export function removePermission() {
  return localStorage.removeItem(Permission)
}

