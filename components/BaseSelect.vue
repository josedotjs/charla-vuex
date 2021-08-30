<template>
  <fieldset class="d-flex flex-row fw item">
    <legend>{{ label }}</legend>
    <v-select
      v-bind="$attrs"
      dense
      outlined
      loader-height="5"
      :full-width="true"
      v-on="customListeners"
    />
  </fieldset>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Array, Boolean],
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
