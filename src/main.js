import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
// axios.defaults.baseURL = 'http://47.92.251.172:8443/api'

// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
// TODO make axios be the globally component
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line no-console
  console.log(to.meta.requireAuth)
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      // eslint-disable-next-line no-console
      console.log(store.state.user.username)
      next()
    } else {
      next({
        path: 'login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  components: { App },
  render: h => h(App),
  router,
  store,
  template: '<App/>'
})
