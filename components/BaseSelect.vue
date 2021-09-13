<template>
  <v-select
    v-bind="$attrs"
    dense
    outlined
    loader-height="5"
    :full-width="true"
    v-on="customListeners"
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Array, Boolean],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
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
}
</script>
