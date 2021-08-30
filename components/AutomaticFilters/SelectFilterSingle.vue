<template>
  <base-select :items="items" v-bind="$attrs" v-on="customListeners" />
</template>

<script>
export default {
  props: {
    filterKey: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    customListeners() {
      const vm = this
      return {
        ...this.$listeners,
        input: (event) => {
          // const castArray = (value) => (Array.isArray(value) ? value : [value])
          // const arrValue = castArray(event)
          vm.$emit('input', event, this.filterKey, 'combo', event)
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
