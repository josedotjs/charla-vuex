export const state = () => ({
  products: [],
  loading: false,
  loaded: false,
})

export const actions = {
  async getProducts({ commit }) {
    try {
      commit('SET_LOADING', true)
      const products = await this.$axios.get('/apiProducts/products')
      commit('SET_PRODUCTS', products.data)
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
