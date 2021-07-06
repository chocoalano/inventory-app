import $axios from '../api.js'

const state = () => ({
  fulldialog:false,
})

const mutations = {
  SET_DIALOG(state, payload) {
    state.fulldialog = payload
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
