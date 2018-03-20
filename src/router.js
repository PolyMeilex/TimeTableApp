import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    { path: '/', component: load('Hello') },
    { path: '/mainA1', component: load('mainA1') },
    { path: '/info', component: load('info') },
    { path: '/zasts', component: load('zasts') },
    { path: '/pack', component: load('pack') },
    
    { path: '*', component: load('Hello') } // Not found
  ]
})
