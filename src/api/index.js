/**
 * api接口
 */

const apiUrl = 'http://overseas.haier.net:8080'

const api = {
  Home: '/api/exhibits/clientHomeInfo', // ----------------------- 首页
  About: '/api/company/clientDetail', // ------------------------- 关于我们
  Brand: '/api/brand/detail', // --------------------------------- 品牌
  CategoryList: '/api/category/list', // ------------------------- 产品一级分类
  SubCategorys: '/api/category/subcategorys', // ----------------- 产品二级分类
  ProductList: '/api/exhibits/clientPage', // -------------------- 产品列表
  ExhibitsFiles: '/api/exhibits/getExhibitsFiles/', // ----------- 产品文件
  LiveroomList: '/api/liveroom/clientList', // ------------------- 直播列表
  LiveroomBackList: '/api/liveroom/clientPlayBackPage', // ------- 直播回放
  ClientGetByType: '/api/dict/clientGetByType', // --------------- 字典查询
  ClientGetRegion: '/api/dict/clientGetRegion', // --------------- 获取所有区域
  Inquiry: '/api/inquiry/save', // ------------------------------- 提交咨询
  Meeting: '/api/meeting/saveDemand', // ------------------------- 提交会议需求
  Liveplatform: '/api/liveplatform', // -------------------------- 目睹直播回调
  CheckToken: '/api/user/checktoken', // ------------------------- 验证token是否有效
  Logout: '/api/user/logout', // --------------------------------- 用户登出
  Login: '/api/user/login', // ----------------------------------- 普通登陆
  AdLogin: '/api/user/adlogin', // ------------------------------- Ad域登陆
  Sendcaptcha: '/api/user/sendcaptcha', // ----------------------- 发送验证码
  Resetpwd: '/api/user/resetpwd', // ----------------------------- 重置密码
  UserCancel: '/api/user/cancel', // ----------------------------- 注销用户
  Usertype: '/api/user/getpreinfo', // --------------------------- 获取用户类型
  Register: '/api/user/addfront', // ----------------------------- 注册
  UploadImg: apiUrl + '/api/file/upload', // --------------------- 上传图片接口
}
export default api
