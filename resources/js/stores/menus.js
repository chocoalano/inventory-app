import $axios from '../api.js'

const state = () => ({
    // STATE TABLE STARTED
    menusdata_table: [],
    progress_table: false,
    page_table: 1,
    id: '',
    perpage_table: 0,
    length_table: 0,
    search_table: '',
    singleSelect_table: false,
    selected_table: [],
    headers_table:[
      { text: 'Name', align: 'start', sortable: false, value: 'name'},
      { text: 'Type', value: 'type' },
      { text: 'Icon', value: 'icon' },
      { text: 'Link', value: 'link' },
      { text: 'Guard', value: 'authorization' },
      { text: 'Actions', value: 'actions' },
    ],
    // STATE TABLE ENDED
    // STATE FORM STARTED
    form_menus: {
      name:'',
      type:'',
      extend:'',
      icon:'',
      link:'',
      authorization:''
    },
    // STATE FORM ENDED
    authorization: [],
    extend: [],
    progress_form: false,
    alert: false,
    dialog: false,
    alertmsg: '',
})

const mutations = {
  // MUTATION TABLE STARTED
  ASSIGN_DATA_TABLE(state, payload) {
      state.menusdata_table = payload
  },
  ASSIGN_PROGRESS_TABLE(state, payload) {
      state.progress_table = payload
  },
  ASSIGN_PAGE_TABLE(state, payload) {
      state.page_table = payload
  },
  ASSIGN_PERPAGE_TABLE(state, payload) {
      state.perpage_table = payload
  },
  ASSIGN_LENGTH_TABLE(state, payload) {
      state.length_table = payload
  },
  ASSIGN_SEARCH_TABLE(state, payload) {
      state.search_table = payload
  },
  ASSIGN_SELECTED_TABLE(state, payload) {
      state.selected_table = payload
  },
  CLEAR_SELECTED_TABLE(state, payload) {
      state.selected_table = []
  },
  ASSIGN_SINGLE_SELECTED_TABLE(state, payload) {
      state.singleSelect_table = payload
  },
  // MUTATION TABLE ENDED
  ASSIGN_PROGRESS_FORM(state, payload) {
      state.progress_form = payload
  },
  ASSIGN_ALERT(state, payload) {
      state.alert = payload
  },
  ASSIGN_ALERT_MSG(state, payload) {
      state.alertmsg = payload
  },
  ASSIGN_FORM(state, payload) {
      state.form_menus= {
        name:payload.name,
        type:payload.type,
        extend:payload.extend,
        icon:payload.icon,
        link:payload.link,
        authorization:payload.authorization
      }
  },
  CLEAR_FORM(state, payload) {
      state.form_menus= {
        name:'',
        type:'',
        extend:'',
        icon:'',
        link:'',
        authorization:''
      }
  },
  ASSIGN_ID(state, payload) {
      state.id= payload
  },
  CLEAR_ID(state, payload) {
      state.id= ''
  },
  ASSIGN_EXTEND(state, payload) {
      state.extend= payload
  },
  ASSIGN_AUTHORIZATION(state, payload) {
      state.authorization= payload
  },
  SET_DIALOG(state, payload) {
      state.dialog= payload
  },
}

const actions = {
    getmenu({ commit, state }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/get-menu`)
            .then((response) => {
                commit('ASSIGN_EXTEND', response.data)
                resolve(response.data)
            })
        })
    },
    getauthorization({ commit, state }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/get-authorization`)
            .then((response) => {
                commit('ASSIGN_AUTHORIZATION', response.data)
                resolve(response.data)
            })
        })
    },
    Index({ commit, state }, payload) {
        commit('ASSIGN_PROGRESS_TABLE', true)
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            $axios.get(`/menus?page=${state.page_table}&q=${state.search_table}`)
            .then((response) => {
                commit('ASSIGN_DATA_TABLE', response.data)
                commit('ASSIGN_PERPAGE_TABLE', response.data.meta.per_page)
                commit('ASSIGN_LENGTH_TABLE', response.data.meta.last_page)
                resolve(response.data)
                commit('ASSIGN_PROGRESS_TABLE', false)
            })
        })
    },
    Save({dispatch, commit, state}, payload){
      commit('ASSIGN_PROGRESS_FORM', true)
      return new Promise((resolve, reject) => {
          $axios.post(`/menus`, state.form_menus)
          .then((response) => {
              dispatch('Index').then(() => {
                  resolve(response.data)
                  commit('ASSIGN_ALERT', true)
                  commit('ASSIGN_ALERT_MSG', response.data.msg)
                  setTimeout(() => {
                    commit('ASSIGN_ALERT', false)
                    commit('ASSIGN_ALERT_MSG', response.data.msg)
                  }, 4000)
              })
              commit('CLEAR_FORM')
              commit('ASSIGN_PROGRESS_FORM', false)
          })
      })
    },
    show({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/menus/${payload}/edit`)
            .then((response) => {
                commit('ASSIGN_FORM', response.data)
                commit('ASSIGN_ID', payload)
                resolve(response.data)
            })
        })
    },
    update({dispatch, commit, state}, payload){
      commit('ASSIGN_PROGRESS_FORM', true)
      return new Promise((resolve, reject) => {
          $axios.put(`/menus/${payload}`, state.form_menus)
          .then((response) => {
              dispatch('Index').then(() => {
                  resolve(response.data)
                  commit('ASSIGN_ALERT', true)
                  commit('ASSIGN_ALERT_MSG', response.data.msg)
                  setTimeout(() => {
                    commit('ASSIGN_ALERT', false)
                    commit('ASSIGN_ALERT_MSG', response.data.msg)
                  }, 4000)
              })
              commit('CLEAR_FORM')
              commit('ASSIGN_PROGRESS_FORM', false)
          })
      })
    },
    remove({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/menus/${payload}`)
            .then((response) => {
                commit('ASSIGN_ALERT', true)
                commit('ASSIGN_ALERT_MSG', response.data.msg)
                setTimeout(() => {
                  commit('ASSIGN_ALERT', false)
                  commit('ASSIGN_ALERT_MSG', response.data.msg)
                }, 4000)
                dispatch('Index').then(() => resolve())
            })
        })
    },
    removeAll({ dispatch, commit, state }) {
        return new Promise((resolve, reject) => {
            $axios.post(`/menu-select-remove`, state.selected_table)
            .then((response) => {
                commit('CLEAR_SELECTED_TABLE')
                commit('ASSIGN_SINGLE_SELECTED_TABLE', false)
                commit('ASSIGN_ALERT', true)
                commit('ASSIGN_ALERT_MSG', response.data.msg)
                setTimeout(() => {
                  commit('ASSIGN_ALERT', false)
                  commit('ASSIGN_ALERT_MSG', response.data.msg)
                }, 4000)
                dispatch('Index').then(() => resolve())
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
