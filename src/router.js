import Vue from 'vue'
import Router from 'vue-router'
import Theater from './views/Theater.vue'

import layout from './assets/layout.json'
import groups from './assets/groups.json'

console.log(layout)
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'theater',
      component: Theater,
      props: { layoutProp: layout, groupsProp: groups }
    }
  ]
})
