import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'

// users
import IndexUsers from './pages/users/Index.vue'
import DataUsers from './pages/users/Data.vue'
// users
// roles & permission
import IndexRoles from './pages/roles/Index.vue'
import DataRoles from './pages/roles/Data.vue'
// roles & permission
import store from './store.js'
Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
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
            path: '/login',
            name: 'login',
            component: Login
        },
        {
          path: '/users',
          component: IndexUsers,
          children: [
              {
                  path: '',
                  name: 'users.data',
                  component: DataUsers,
                  meta: { title: 'Manage Users' }
              }
          ]
        },
        {
          path: '/roles',
          component: IndexRoles,
          children: [
              {
                  path: '',
                  name: 'roles.data',
                  component: DataRoles,
                  meta: { title: 'Manage Roles & Permission' }
              }
          ]
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
