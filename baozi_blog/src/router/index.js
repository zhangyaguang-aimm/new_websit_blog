import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'

import adminRouter from './module/admin'



Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['../views/out.vue'], resolve),
      children: [
        {
          path: '/',
          name: '首页',
          component: resolve => require(['../views/index.vue'], resolve),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/detail/:id',
          name: '详情',
          component: resolve => require(['../views/detail.vue'],resolve),
          meta: {
            title: '详情'
          }
        },
        {
          path: '/study',
          name: '学习分享',
          component: resolve =>require(['../views/studyShare.vue'], resolve),
          meta: {
            title: '学习分享'
          }
        },
        {
          path: '/case',
          name: '随笔',
          component: resolve => require(['../views/casualNotes.vue'], resolve),
          meta: {
            title: '随笔'
          },
        },
        {
          path: '/about',
          name: '关于',
          component: resolve => require(['../views/about.vue'], resolve),
          meta: {
            title: '关于'
          }
        },
        {
          path: '/article/:id',
          name: '详情',
          component: resolve => require(['../views/article.vue'], resolve),
          meta: {
            title: '详情'
          }
        },
        {
          path: '/discuss',
          name: '讨论区',
          component: resolve => require(['@/views/discuss.vue'], resolve),
          meta: {title: '讨论区'}
        }
      ]
    },
    adminRouter,
    {
      path: '/login',
      name: '登录',
      component: resolve => require(['@/views/login.vue'], resolve),
      meta: {title: '登录'}
    },
    {
      path: '/register',
      name: '注册',
      component: resolve => require(['@/views/register.vue'], resolve),
      meta: {title: '注册'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  if(to.matched.some(record => record.meta.requireAuthor)){
    store.dispatch('getUser').then(data => {
      if(data == 1){
        next()
      }else{
        next('/login')
      }
    }).catch(err => {
      next('/login')
    })

  }
  next()
})

export default router