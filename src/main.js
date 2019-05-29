// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import router from './router'
import axios from 'axios'
import store from './store/store'
import 'iview/dist/styles/iview.css';



Vue.use(iView)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //实列化放到全局之中
  components: { App },
  template: '<App/>'
})

/**
 * 拦截器
 * **/
router.beforeEach(function (to, from, next) {
  //console.log(to)
  //console.log(from)
  if (to.name == "Person") {
    //要去的url只有登录成功才能访问
    if (store.state.token) {
      next()
    } else {
      // 没有登录去登录
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})