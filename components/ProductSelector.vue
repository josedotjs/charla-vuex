<template>
  <base-select
    :items="products"
    :loading="loading"
    item-text="name"
    item-value="id"
    placeholder="Seleccione un producto"
    v-bind="$attrs"
    v-on="customListeners"
    @click:append-outer="refresh"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    value: {
      type: [String, Number, Array],
      default: '',
    },
  },
  computed: {
    customListeners() {
      const vm = this
      const input = (event) => {
        vm.$emit('input', event)
      }
      return { ...this.$listeners, input }
    },
    ...mapState({
      products: (state) => state.products.products,
      loading: (state) => state.products.loading,
      loaded: (state) => state.products.loaded,
    }),
  },
  created() {
    if (!this.loaded) {
      this.$store.dispatch('products/getProducts')
    }
  },
  methods: {
    refresh() {
      this.$store.dispatch('products/getProducts')
    },
  },
}
</script>

<style lang="scss" scoped></style>
