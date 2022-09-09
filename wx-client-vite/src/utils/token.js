import Cookies from 'js-cookie';
import * as timeType from './constants';

const tokenKey = 'Admin-Token';

// 获取token
export function getToken() {
   return Cookies.get(tokenKey);
}

// 设置
export function setToken(token) {
    return Cookies.set(tokenKey, token);
}

// 删除
export function deleteToken() {
    return Cookies.remove(tokenKey);
}

// 登陆时间设置
export function setTokenTime() {
    return localStorage.setItem(timeType.TOKEN_TIME, Date.now());
}

// 获取当前的时间
export function getTokenTime() {
    return localStorage.getItem(timeType.TOKEN_TIME);
}

// 是否过期
export function diffTokenTime() {
    return Date.now() - getTokenTime() > timeType.TOKEN_TIME_VALUE;
}