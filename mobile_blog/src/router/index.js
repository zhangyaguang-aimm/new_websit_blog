import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['../views/index.vue'],resolve),
      name: '首页',
      meta: {title: '首页'}
    },
    {
      path: '/detail/:id',
      component: resolve => require(['../views/detail.vue'], resolve),
      name: '详情',
      meta: {title: '详情'}
    },
    {
      path: '/read/:bookId/:chapterId',
      component: resolve => require(['../views/read.vue'], resolve),
      name: '阅读页',
      meta: {title: '阅读页'}
    },
    {
      path: '/chapterlist/:bookId',
      component: resolve => require(['../views/chapterList.vue'], resolve),
      name: '章节列表',
      meta: {title: '章节列表'}
    }
  ]
})
