import $axios from '../api.js'

const state = () => ({
  loading:false,
  user:{
    name:'',
    email:'',
  },
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
}

const actions = {
    submit({ commit }, payload) {
        commit('SET_LOADING', true)
        localStorage.setItem('token', null)
        commit('SET_TOKEN', null, { root: true })
        return new Promise((resolve, reject) => {
            $axios.post('/login', payload)
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
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
