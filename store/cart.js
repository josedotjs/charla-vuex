export const state = () => {
  return {
    cart: [],
  }
}

export const actions = {
  addToCart({ commit, state }, product) {
    commit('ADD_TO_CART', product)
  },
  empty({ commit }) {
    commit('EMPTY')
  },
}

export const mutations = {
  ADD_TO_CART(state, product) {
    const productInCart = state.cart.find(
      (cartItem) => cartItem.product.id === product.id
    )
    if (productInCart) {
      productInCart.quantity += 1
      state.cart.splice(state.cart.indexOf(productInCart), 1, productInCart)
    } else {
      state.cart.push({
        product,
        quantity: 1,
      })
    }
  },
  EMPTY(state) {
    state.cart = []
  },
}

export const getters = {
  itemsCount: (state) =>
    state.cart.reduce((accumulator, current) => {
      return current.quantity + accumulator
    }, 0),
}
