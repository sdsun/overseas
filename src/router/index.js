import Vue from 'vue'
import VueRouter from 'vue-router'
import { UserLayout } from '@/layouts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Index'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/Index'),
    meta: {
      title: 'About Us'
    }
  },
  {
    path: '/brand/:id',
    name: 'Brand',
    component: () => import('@/views/brand/Index'),
    meta: {
      title: 'Brands'
    }
  },
  {
    path: '/exhibits/list/:id?',
    name: 'Exhibits',
    component: () => import('@/views/product/Index'),
    meta: {
      title: 'Exhibits'
    }
  },
  {
    path: '/live',
    name: 'Live',
    component: () => import('@/views/live/Index'),
    meta: {
      title: 'Live'
    }
  },
  // user
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/user/Login'),
        meta: {
          title: 'Login'
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/user/Register'),
        meta: {
          title: 'Register'
        }
      },
      {
        path: 'find_pwd',
        name: 'FindPwd',
        component: () => import('@/views/user/FindPwd'),
        meta: {
          title: 'Find Password'
        }
      }
    ]
  },
  {
    path: '/user/live_auth',
    name: 'LiveAuth',
    component: () => import('@/views/user/LiveAuth'),
    meta: {
      title: 'live auth'
    }
  },
  {
    path: '*',
    component: () => import('@/views/404')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
