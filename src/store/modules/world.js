const state = {
  ttt: ''
}

const getters = {
  ttt: state => state.ttt
}

const actions = {
  w({commit, state}, obj) {
    commit('www', obj)
  }
}

const mutations = {
  www(state, obj) {
    state.ttt = obj
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
