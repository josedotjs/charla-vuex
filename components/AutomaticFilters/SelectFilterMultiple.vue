<template>
  <base-select :items="items" multiple v-bind="$attrs" v-on="customListeners" />
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
          console.log('value event', event)
          let value
          if (event.length) {
            value = {
              $in: event,
            }
          } else {
            value = null
          }

          console.log('input', event, value)
          vm.$emit('input', event, this.filterKey, 'combo', value)
        },
      }
    },
  },
  methdos: {
    castArray(value) {
      return Array.isArray(value) ? value : [value]
    },
  },
}
</script>

<style lang="scss" scoped></style>
