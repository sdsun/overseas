import api from './index'
import Service from '../utils/http'

// 获取首页数据
export const getHome = params =>{
  return Service.get(api.Home, params)
}

// 获取集团介绍数据
export const getAbout = params =>{
  return Service.get(api.About, params)
}

// 获取品牌详情
export const getBrand = params =>{
  return Service.get(api.Brand, params)
}

// 获取区域
export const getClientGetRegion = params =>{
  return Service.get(api.ClientGetRegion, params)
}

// 获取展品一级分类
export const getCate = params =>{
  return Service.get(api.CategoryList, params)
}

// 获取展品二级分类
export const getSubCate = params =>{
  return Service.get(api.SubCategorys, params)
}

// 获取展品列表数据
export const getProductList = params =>{
  return Service.get(api.ProductList, params)
}

// 获取产品文件
export const getExhibitsFiles = params =>{
  return Service.get(api.ExhibitsFiles + params)
}
// 获取直播数据
export const getLiveroomList = params =>{
  return Service.get(api.LiveroomList, params)
}

// 获取直播回放数据
export const getLiveroomBackList = params =>{
  return Service.get(api.LiveroomBackList, params)
}

// 获取字典
export const getClientGetByType = params =>{
  return Service.get(api.ClientGetByType, params)
}

// 提交咨询
export const postInquiry = data =>{
  return Service.post(api.Inquiry, data)
}

// 提交会议需求
export const postMeeting = data =>{
  return Service.post(api.Meeting, data)
}
