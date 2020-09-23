import api from './index'
import Service from '../utils/http'

// 登出
export const getLogout = params =>{
  return Service.get(api.Logout, params)
}

// 是否需要登陆
export const getCheckToken = params =>{
  return Service.get(api.CheckToken, params)
}

// 获取用户类型
export const getUsertype = params =>{
  return Service.get(api.Usertype, params)
}

// 登陆
export const postLogin = data =>{
  return Service.post(api.Login, data)
}

// Ad域登陆
export const getAdLogin = params =>{
  return Service.get(api.AdLogin, params)
}

// 发送邮箱验证码
export function postSendcaptcha (params) {
  return Service({
    url: api.Sendcaptcha,
    method: 'post',
    params: params
  })
}

// 注册
export const postRegister = data =>{
  return Service.post(api.Register, data)
}

// 密码重置
export const postResetpwd = data =>{
  return Service.post(api.Resetpwd, data)
}

// 销户
export const postUserCancel = data =>{
  return Service.post(api.UserCancel, data)
}

// 直播回调传参
export const postLiveplatform = data =>{
  return Service.post(api.Liveplatform, data)
}