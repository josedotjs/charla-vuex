<template>
  <base-select
    :items="products"
    :loading="loading"
    item-text="name"
    item-value="id"
    placeholder="Seleccione un producto"
    v-bind="$attrs"
    v-on="customListeners"
  />
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    customListeners() {
      const vm = this
      const input = (event) => {
        vm.$emit('input', event)
      }
      return { ...this.$listeners, input }
    },
    ...mapState({
      products: (state) => state.productsapi.products,
      loading: (state) => state.productsapi.loading,
      loaded: (state) => state.productsapi.loaded,
    }),
  },
  created() {
    // this.$store.dispatch('productsapi/getProducts')
  },
}
</script>

<style lang="scss" scoped></style>
