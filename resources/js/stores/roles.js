import $axios from '../api.js'

const state = () => ({
    rolesdata: [],
    id:'',
    roles_name:'',
    progress_table: false,
    progress: false,
    alert: false,
    alertmsg: '',
    roles: [],
    page: 1,
    itemsPerPage: 0,
    pageCount: 0,
    pageLength: 0,
    dialogcreate: false,
    dialogedit: false,
    permission: [],
    permission_form: [],
    p_page: 1,
    p_length: 15,
    p_total: 7,
})

const mutations = {
    ASSIGN_ID_PICKERS(state, payload) {
        state.idPicker = payload
    },
    ASSIGN_PROGRESS(state, payload) {
        state.progress = payload
    },
    ASSIGN_PROGRESS_TABLE(state, payload) {
        state.progress_table = payload
    },
    ASSIGN_ALERT(state, payload) {
        state.alert = payload
    },
    ASSIGN_ALERT_MSG(state, payload) {
        state.alertmsg = payload
    },
    ASSIGN_DATA(state, payload) {
        state.rolesdata = payload
    },
    ASSIGN_PERMISSION(state, payload) {
        state.permission = payload
    },
    SET_DIALOG_CREATE(state, payload) {
        state.dialogcreate = payload
    },
    SET_DIALOG_EDIT(state, payload) {
        state.dialogedit = payload
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
    SET_PAGE_P_PAGE(state, payload) {
        state.p_page = payload
    },
    SET_PAGE_P_LENGTH(state, payload) {
        state.p_length = payload
    },
    SET_PAGE_P_TOTAL(state, payload) {
        state.p_total = payload
    },
    SET_ID(state, payload) {
        state.id = payload
    },
    CLEAR_ID(state, payload) {
        state.id = ''
    },
    ASSIGN_FORM(state, payload) {
        state.roles_name = payload
    },
    ASSIGN_FORM_PERMISSION(state, payload) {
        state.permission_form = payload
    },
    CLEAR_FORM_PERMISSION(state, payload) {
        state.permission_form = []
    },
    CLEAR_FORM(state) {
        state.roles_name = ''
    }
}

const actions = {

    getUsers({ commit, state }, payload) {
        commit('ASSIGN_PROGRESS_TABLE', true)
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            $axios.get(`/roles?page=${state.page}&q=${search}`)
            .then((response) => {
                commit('ASSIGN_DATA', response.data)
                commit('SET_ITEMPERPAGE', response.data.meta.per_page)
                commit('SET_PAGELENGTH', response.data.meta.last_page)
                resolve(response.data)
                commit('ASSIGN_PROGRESS_TABLE', false)
            })
        })
    },
    getPermission({ commit, state }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/roles-permission?page=${state.p_page}`)
            .then((response) => {
                commit('ASSIGN_PERMISSION', response.data.data)
                commit('SET_PAGE_P_LENGTH', response.data.meta.last_page)
                commit('SET_PAGE_P_TOTAL', response.data.meta.total)
                resolve(response.data)
            })
        })
    },
    submitUsers({ dispatch, commit, state }) {
        commit('ASSIGN_PROGRESS', true)
        return new Promise((resolve, reject) => {
            $axios.post(`/users`, state.user)
            .then((response) => {
                dispatch('getUsers').then(() => {
                    resolve(response.data)
                    commit('ASSIGN_ALERT', true)
                    commit('ASSIGN_ALERT_MSG', response.data.msg)
                    setTimeout(() => {
                      commit('ASSIGN_ALERT', false)
                      commit('ASSIGN_ALERT_MSG', response.data.msg)
                    }, 4000)
                })
                commit('ASSIGN_PROGRESS', false)
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
                commit('ASSIGN_FORM', response.data)
                resolve(response.data)
            })
        })
    },
    updateUsers({ dispatch, state, commit }, payload) {
        commit('ASSIGN_PROGRESS', true)
        return new Promise((resolve, reject) => {
            $axios.put(`/users/${payload}`, state.user)
            .then((response) => {
                dispatch('getUsers').then(() => {
                    resolve(response.data)
                    commit('ASSIGN_ALERT', true)
                    commit('ASSIGN_ALERT_MSG', response.data.msg)
                    setTimeout(() => {
                      commit('ASSIGN_ALERT', false)
                      commit('ASSIGN_ALERT_MSG', response.data.msg)
                      commit('CLEAR_FORM')
                    }, 4000)
                })
                commit('ASSIGN_PROGRESS', false)
            })
        })
    } ,
    removeUsers({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/users/${payload}`)
            .then((response) => {
                commit('ASSIGN_ALERT', true)
                commit('ASSIGN_ALERT_MSG', response.data.msg)
                setTimeout(() => {
                  commit('ASSIGN_ALERT', false)
                  commit('ASSIGN_ALERT_MSG', response.data.msg)
                }, 4000)
                dispatch('getUsers').then(() => resolve())
            })
        })
    },
    removeUsersAll({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/users-all-remove`, payload)
            .then((response) => {
                commit('ASSIGN_ALERT', true)
                commit('ASSIGN_ALERT_MSG', response.data.msg)
                setTimeout(() => {
                  commit('ASSIGN_ALERT', false)
                  commit('ASSIGN_ALERT_MSG', response.data.msg)
                }, 4000)
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
