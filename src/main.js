
require(`quasar/dist/quasar.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'

import VueFire from 'vuefire'

Vue.use(VueFire)

import 'quasar-extras/animate/fadeIn.css'
import 'quasar-extras/animate/fadeOut.css'
import 'quasar-extras/animate/fadeOutRight.css'
import 'quasar-extras/animate/shake.css'


Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'


Quasar.start(() => {
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App').default)
  })
})
