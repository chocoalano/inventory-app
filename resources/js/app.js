import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import router from './router.js'
import store from './store.js'
import App from './App.vue'

Vue.use(Vuetify);

new Vue({
    el: '#app',
    vuetify : new Vuetify(),
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    },
    router,
    store,
    components: {
        App
    }
})
