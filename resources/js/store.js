import Vue from 'vue'
import Vuex from 'vuex'
import home from './stores/home.js'
import auth from './stores/auth.js'
import userscrud from './stores/users.js'
import rolescrud from './stores/roles.js'
import menuscrud from './stores/menus.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        auth,
        home,
        userscrud,
        rolescrud,
        menuscrud,
    },
    state: {
        token: localStorage.getItem('token'),
        expired: false,
        baseUrl: process.env.NODE_ENV == 'production'? "https://example.com" : 'http://localhost:8000',
        errors: []
    },
    getters: {
        isAuth: state => {
            return state.token != "null" && state.token != null
        }
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload
        },
        SET_EXPIRED(state, payload) {
            state.expired = payload
        },
        SET_ERRORS(state, payload) {
            state.errors = payload
        },
        CLEAR_ERRORS(state) {
            state.errors = []
        }
    }
})
export default store
