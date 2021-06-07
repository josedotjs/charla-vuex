<template>
  <base-select
    :items="items"
    :value="value"
    item-value="value"
    item-text="label"
    placeholder="Seleccione un documento"
    append-outer-icon="mdi-refresh"
    v-bind="$attrs"
    v-on="customListeners"
    @click:append-outer="test"
  />
</template>

<script>
import BaseSelect from './BaseSelect.vue'
export default {
  components: {
    BaseSelect,
  },
  inheritAttrs: false,

  props: {
    value: {
      required: true,
      type: [String, Array],
    },
  },

  data() {
    return {
      items: [
        {
          label: 'DNI',
          value: 1,
        },
        {
          label: 'RUC',
          value: 2,
        },
        {
          label: 'Otro',
          value: 3,
        },
      ],
    }
  },

  computed: {
    customListeners() {
      const vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: (event) => {
            vm.$emit('input', event)
          },
        }
      )
    },
  },
  methods: {
    test() {
      console.log(process.env.TEST_MESSAGE)
    },
  },
}
</script>
