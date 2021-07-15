export const state = () => ({
  counter: 0,
})

export const actions = {
  increment({ commit }, value = 1) {
    commit('INCREMENT', value)
  },
}

export const mutations = {
  INCREMENT(state, value) {
    state.counter += value
  },
}
