const state = {
  product: ''
}

const getters = {
  product: state => state.product
}

const actions = {
  updateProduct: ({ commit, state }, obj) => {
    commit('do', obj)
  },
  doRole ({commit, state, root}, role) {
    commit('ROLE_TYPE', role, {root: true})
  },
  doW ({commit}, obj) {
    commit('world/www', obj, {root: true})
  }
}

const mutations = {
  do (state, obj) {
    state.product = obj
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
