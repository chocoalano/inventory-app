import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home/Index.vue'
import Login from './pages/Login.vue'

import IndexUsers from './pages/users/Index.vue'
import IndexRoles from './pages/roles/Index.vue'
import IndexMenus from './pages/menus/Index.vue'

import store from './store.js'
Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
              requiresAuth: true,
              title: 'Home pages'
            }
        },
        {
          path: '/users',
          component: IndexUsers,
          meta: {
            requiresAuth: true,
            title: 'Users Manage'
          }
        },
        {
          path: '/roles',
          component: IndexRoles,
          meta: {
            requiresAuth: true,
            title: 'Roles & Permission Manage'
          }
        },
        {
          path: '/menus',
          component: IndexMenus,
          meta: {
            requiresAuth: true,
            title: 'Menu Manage'
          }
        },
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        store.commit('CLEAR_ERRORS')
        let auth = store.getters.isAuth
        if (!auth) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router
