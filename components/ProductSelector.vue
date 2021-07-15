<template>
  <base-select
    :items="products"
    :loading="loading"
    item-text="name"
    item-value="_id"
    placeholder="Seleccione un producto"
    v-bind="$attrs"
    v-on="customListeners"
    @click:append-outer="refresh"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Array],
      default: '',
    },
  },
  data() {
    return {
      products: [],
      loading: false,
    }
  },
  computed: {
    customListeners() {
      const vm = this
      const input = (event) => {
        vm.$emit('input', event)
      }
      return { ...this.$listeners, input }
    },
  },
  async created() {
    await this.getData()
  },
  methods: {
    async getData() {
      try {
        this.loading = true
        const options = {
          select: 'name',
          // pagination: false,
          // sort: '-name',
          // limit: 2,
        }
        const { data } = await this.$apiMongoose.get(
          `/products/query?${this.$serialize(options)}`
        )
        console.log(data)
        this.products = data.docs
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    refresh() {
      this.$store.dispatch('products/getProducts')
    },
  },
}
</script>

<style lang="scss" scoped></style>
