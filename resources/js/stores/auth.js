import $axios from '../api.js'

const state = () => ({
  loading:false,
  data: {
      email: '',
      password: ''
  },
  user:{
    name:'',
    email:'',
  },
  authenticated: []
})

const mutations = {
  SET_LOADING(state, payload) {
        state.loading = payload
  },
  SET_USER(state, payload) {
    state.user = {
        name: payload.data.name,
        email: payload.data.email,
    }
  },
  ASSIGN_USER_AUTH(state, payload) {
        state.authenticated = payload
  },
  ASSIGN_FORM(state, payload) {
    state.data = {
        email: payload.email,
        password: payload.password,
    }
  },
  CLEAR_FORM(state, payload) {
    state.data = {
        email: '',
        password: '',
    }
  },
}

const actions = {
    submit({ commit, state }) {
        commit('SET_LOADING', true)
        localStorage.setItem('token', null)
        commit('SET_TOKEN', null, { root: true })
        return new Promise((resolve, reject) => {
            $axios.post('/login', state.data)
            .then((response) => {
                if (response.status == 200) {
                    localStorage.setItem('token', response.data.token)
                    commit('SET_TOKEN', response.data.token, { root: true })
                } else {
                    commit('SET_ERRORS', { invalid: 'Email/Password Salah' }, { root: true })
                }
                commit('SET_LOADING', false)
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                commit('SET_LOADING', false)
            })
        })
    },
    relogin({ commit, state }) {
        commit('SET_LOADING', true)
        localStorage.setItem('token', null)
        commit('SET_TOKEN', null, { root: true })
        return new Promise((resolve, reject) => {
            $axios.post('/login', state.data)
            .then((response) => {
                if (response.status == 200) {
                    localStorage.setItem('token', response.data.token)
                    commit('SET_TOKEN', response.data.token, { root: true })
                } else {
                    commit('SET_ERRORS', { invalid: 'Email/Password Salah' }, { root: true })
                }
                commit('SET_LOADING', false)
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                commit('SET_LOADING', false)
            })
        })
    },
    logout({ commit }) {
        commit('SET_LOADING', true)
        return new Promise((resolve, reject) => {
            $axios.get(`/logout`)
            .then((response) => {
              if (response.status == 200) {
                  localStorage.removeItem('token')
                  commit('SET_TOKEN', null, { root: true })
              }
              resolve(response.success)
              commit('SET_LOADING', false)
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                commit('SET_LOADING', false)
            })
        })
    },
    user_auth({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/auth-user`)
            .then((response) => {
              commit('SET_USER', response)
            })
        })
    },
    getUserLogin({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`user-authenticated`)
            .then((response) => {
                if (response.data.status==="Token is Expired") {
                  commit('SET_EXPIRED', true, { root: true })
                }else {
                  commit('ASSIGN_USER_AUTH', response.data.data)
                  resolve(response.data)
                }
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
