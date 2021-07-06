import $axios from '../api.js'

const state = () => ({
    rolesdata: [],
    id:'',
    form_roles:{
      name:'',
      permission:[],
    },
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
    p_page: 0,
    p_length: 0,
    p_total: 0,
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
        state.form_roles={
          name:payload.name,
          permission:payload.permission,
        }
    },
    CLEAR_FORM(state) {
      state.form_roles={
        name:'',
        permission:[],
      }
    }
}

const actions = {

    getIndex({ commit, state }, payload) {
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
    submitAdd({ dispatch, commit, state }) {
        commit('ASSIGN_PROGRESS', true)
        return new Promise((resolve, reject) => {
            $axios.post(`/roles`, state.form_roles)
            .then((response) => {
                dispatch('getIndex').then(() => {
                    resolve(response.data)
                    commit('ASSIGN_ALERT', true)
                    commit('ASSIGN_ALERT_MSG', response.data.msg)
                    setTimeout(() => {
                      commit('ASSIGN_ALERT', false)
                      commit('ASSIGN_ALERT_MSG', response.data.msg)
                    }, 4000)
                })
                commit('CLEAR_FORM')
                commit('ASSIGN_PROGRESS', false)
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            })
        })
    },
    edit({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/roles/${payload}/edit`)
            .then((response) => {
                commit('ASSIGN_FORM', response.data.data)
                resolve(response.data)
            })
        })
    },
    update({ dispatch, state, commit }, payload) {
        commit('ASSIGN_PROGRESS', true)
        return new Promise((resolve, reject) => {
            $axios.put(`/roles/${payload}`, state.form_roles)
            .then((response) => {
                dispatch('getIndex').then(() => {
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
    remove({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/roles/${payload}`)
            .then((response) => {
                commit('ASSIGN_ALERT', true)
                commit('ASSIGN_ALERT_MSG', response.data.msg)
                setTimeout(() => {
                  commit('ASSIGN_ALERT', false)
                  commit('ASSIGN_ALERT_MSG', response.data.msg)
                }, 4000)
                dispatch('getIndex').then(() => resolve())
            })
        })
    },
    removeAll({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/roles-select-remove`, payload)
            .then((response) => {
                commit('ASSIGN_ALERT', true)
                commit('ASSIGN_ALERT_MSG', response.data.msg)
                setTimeout(() => {
                  commit('ASSIGN_ALERT', false)
                  commit('ASSIGN_ALERT_MSG', response.data.msg)
                }, 4000)
                dispatch('getIndex').then(() => resolve())
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
