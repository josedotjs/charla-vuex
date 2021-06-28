// import { getAll } from '@/services/documents'

export const state = () => {
  return {
    loading: false,
    documents: [],
  }
}

export const actions = {
  async getAll({ commit, state }) {
    try {
      commit('SET_LOADING', true)
      const { data } = await this.$axios.get('/apiDocuments/documents')
      commit('SET_DOCUMENTS', data)
    } catch (err) {
      console.error(err)
    } finally {
      commit('SET_LOADING', false)
    }
  },
}

export const mutations = {
  SET_DOCUMENTS(state, value) {
    state.documents = value
  },
  SET_LOADING(state, value) {
    state.loading = value
  },
}
