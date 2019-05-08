import Vue from 'vue'
import Router from 'vue-router'
import Theater from './views/Theater.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'thater',
      component: Theater
    },
  ]
})
