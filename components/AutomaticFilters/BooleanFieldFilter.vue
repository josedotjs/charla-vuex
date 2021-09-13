<template>
  <fieldset class="item d-flex flex-row fw">
    <legend>{{ label }}</legend>
    <base-select :items="items" v-bind="$attrs" v-on="customListeners" />
  </fieldset>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    filterKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      items: [
        {
          text: 'Todos',
          value: null,
        },
        {
          text: 'Activos',
          value: true,
        },
        {
          text: 'Inactivos',
          value: false,
        },
      ],
    }
  },
  computed: {
    customListeners() {
      const vm = this
      return {
        ...this.$listeners,
        input: (event) => {
          // const castArray = (value) => (Array.isArray(value) ? value : [value])
          // const arrValue = castArray(event)
          vm.$emit('input', event, this.filterKey, 'boolean', event)
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
