import router from './index'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['Login', 'Register', 'FindPwd'] // 路由白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 设置页面标题
  document.title = to.meta.title;
  if (localStorage.getItem('token')) {
    /* has token */
    if (to.path === '/user/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    next()
  }
});

router.afterEach(() => {
  NProgress.done();
});
