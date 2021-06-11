import $axios from '../api.js'

const state = () => ({
    userdata: [],
    user: {
        name: '',
        email: ''
    },
    page: 1,
    itemsPerPage: 0,
    pageCount: 0,
    pageLength: 0,
    dialogcreate: false
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.userdata = payload
    },
    SET_DIALOG_CREATE(state, payload) {
        state.dialogcreate = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_ITEMPERPAGE(state, payload) {
        state.itemsPerPage = payload
    },
    SET_PAGECOUNT(state, payload) {
        state.pageCount = payload
    },
    SET_PAGELENGTH(state, payload) {
        state.pageLength = payload
    },
    ASSIGN_FORM(state, payload) {
        state.user = {
            name: payload.name,
            email: payload.email
        }
    },
    CLEAR_FORM(state) {
        state.user = {
            name: '',
            email: ''
        }
    },
}

const actions = {

    getUsers({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            $axios.get(`/users?page=${state.page}&q=${search}`)
            .then((response) => {
                commit('ASSIGN_DATA', response.data)
                commit('SET_ITEMPERPAGE', response.data.meta.per_page)
                commit('SET_PAGELENGTH', response.data.meta.current_page)
                resolve(response.data)
            })
        })
    },
    submitUsers({ dispatch, commit, state }) {
        return new Promise((resolve, reject) => {
            $axios.post(`/users`, state.Users)
            .then((response) => {
                dispatch('getUsers').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            })
        })
    },
    editUsers({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/users/${payload}/edit`)
            .then((response) => {
                commit('ASSIGN_FORM', response.data.data)
                resolve(response.data)
            })
        })
    },
    updateUsers({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.put(`/users/${payload}`, state.Users)
            .then((response) => {
                commit('CLEAR_FORM')
                resolve(response.data)
            })
        })
    } ,
    removeUsers({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/users/${payload}`)
            .then((response) => {
                dispatch('getUsers').then(() => resolve())
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
