<template>
  <fieldset class="d-flex flex-row fw item">
    <legend>{{ label }}</legend>
    <slot name="prependControl" />
    <v-text-field v-bind="$attrs" outlined full-width v-on="$customListeners" />
    <slot name="appendControl" />
  </fieldset>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
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

<style lang="scss" scoped></style>
