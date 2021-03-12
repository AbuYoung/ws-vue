import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      // home页面并不需要被访问，只是作为其它组件的父组件
      path: '/',
      name: 'Default',
      redirect: '/home',
      component: Home,
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: () => import('../components/home/AppIndex')
        },
        {
          path: '/Library',
          name: 'Library',
          component: () => import('../components/Library/LibraryIndex')
        }
        /* {
          path: '/jotter',
          name: 'Jotter',
          component: () => import('../components/jotter/Articles')
        },
        {
          path: '/jotter/article',
          name: 'Article',
          component: () => import('../components/jotter/ArticleDetails')
        },
        {
          path: '/admin/content/editor',
          name: 'Editor',
          component: () => import('../components/admin/content/ArticleEditor'),
          meta: {
            requireAuth: true
          }
        }, */
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/Register')
    }
  ]
})
