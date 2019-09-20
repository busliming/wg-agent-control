// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 全局组件
import './plugins/all_components'
import Vue from 'vue'
import App from './App'
import router from './router'
// vuex 数据管理
import store from './plugins/vuex'
// ajax请求
import './plugins/axios'


//bootstrap Vue
// import './plugins/bootstrapVue'
//过渡效应
// import './plugins/transitions'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
