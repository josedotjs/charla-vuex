export const state = () => {
  return {
    products: [],
    loading: false,
    loaded: false,
  }
}

export const actions = {
  async getProducts({ commit, apiProducts }) {
    try {
      commit('SET_LOADING', true)
      const { data } = await this.$api.get('/products')
      commit('SET_PRODUCTS', data)
      commit('SET_LOADED', true)
    } catch (e) {
      console.error(e)
    } finally {
      commit('SET_LOADING', false)
    }
  },
}

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = [...products]
  },
  SET_LOADING(state, value) {
    state.loading = value
  },
  SET_LOADED(state, value) {
    state.loaded = value
  },
}
