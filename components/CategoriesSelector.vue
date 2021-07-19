<template>
  <base-select
    :items="items"
    value="value"
    :loading="loading"
    item-value="_id"
    item-text="name"
    placeholder="Seleccione una categoria"
    v-bind="$attrs"
    v-on="customListeners"
  />
</template>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  computed: {
    customListeners() {
      const vm = this
      return {
        ...this.$listeners,
        input: (event) => {
          vm.$emit('input', event)
        },
      }
    },
  },
  async created() {
    this.loading = true
    const { data } = await this.$apiMongoose.get('/categories')
    this.items = data
    this.loading = false
  },
}
</script>
