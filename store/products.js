import { getAll } from '@/services/products'

export const state = () => ({
  products: [],
  loading: false,
})

export const actions = {
  async getProducts({ commit }) {
    try {
      commit('SET_LOADING', true)
      const products = await getAll()
      commit('SET_PRODUCTS', products)
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
}
