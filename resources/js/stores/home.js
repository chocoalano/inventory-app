import $axios from '../api.js'

const state = () => ({
  fulldialog:false,
  xlsx:'',
})

const mutations = {
  SET_DIALOG(state, payload) {
    state.fulldialog = payload
  },
  SET_DATA_XLSX(state, payload) {
    state.xlsx = payload
  },
}

const actions = {
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
