import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import Permissions from './mixins/Permission.js'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

import router from './router.js'
import store from './store.js'
import App from './App.vue'
import { mapActions, mapGetters } from 'vuex'

Vue.use(Vuetify);
Vue.mixin(Permissions);
Vue.use(VueSweetalert2)

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
    },
    computed: {
        ...mapGetters(['isAuth'])
    },
    methods: {
        ...mapActions('auth', ['getUserLogin'])
    },
    created() {
        if (this.isAuth) {
            this.getUserLogin()
        }
    }
})
