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
      const options = {
        pagination: false,
      }
      const { data } = await this.$apiMongoose.get(
        `/products/query?${this.$serialize(options)}`
      )
      commit('SET_PRODUCTS', data.docs)
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
    state.products = products
  },
  SET_LOADING(state, value) {
    state.loading = value
  },
  SET_LOADED(state, value) {
    state.loaded = value
  },
}
