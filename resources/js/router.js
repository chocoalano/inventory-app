import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'

// users
import IndexUsers from './pages/users/Index.vue'
import DataUsers from './pages/users/Data.vue'
import AddUsers from './pages/users/Add.vue'
import EditUsers from './pages/users/Edit.vue'
// users
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
              },
              {
                  path: 'add',
                  name: 'users.add',
                  component: AddUsers,
                  meta: { title: 'Add New Users' }
              },
              {
                  path: 'edit/:id',
                  name: 'users.edit',
                  component: EditUsers,
                  meta: { title: 'Edit Users' }
              }
          ]
      },
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
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
