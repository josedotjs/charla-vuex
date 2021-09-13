<template>
  <base-input
    ref="input1"
    dense
    class="flex-grow-1"
    type="number"
    :label="label"
    v-bind="$attrs"
    :value="value[0]"
    @input="onChange"
  >
    <base-select
      slot="prependControl"
      v-model="operator"
      :items="operators"
      item-text="label"
      item-value="value"
      class="fit"
    />
    <base-input
      v-if="operator === '$between'"
      slot="appendControl"
      type="number"
      class="flex-grow-1"
      dense
    />
  </base-input>
</template>

<script>
import _debounce from 'lodash/debounce'
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: Array,
      default: () => [0],
    },
    filterKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      operator: '$gte',
      operators: [
        {
          label: 'Mayor a',
          value: '$gte',
        },
        {
          label: 'Menor a',
          value: '$lte',
        },
        {
          label: 'Entre',
          value: '$between',
        },
      ],
    }
  },
  methods: {
    onChange: _debounce(function (event) {
      console.log('input', this.operator)
      let value
      // const castArray = (value) => (Array.isArray(value) ? value : [value])
      // const arrValue = castArray(event)
      if (event) {
        value = {
          [this.operator]: Number(event),
        }
      }
      console.log('value event', event)
      this.$emit('input', [event], this.filterKey, 'number', value)
    }, 500),
  },
}
</script>

<style lang="scss" scoped>
.fw {
  width: 100%;
}

fieldset.item {
  font-size: 0.8rem;
  border: 0;
  margin-right: 0.5rem;
}
.item-select,
.item-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
}
.v-select.fit {
  width: 90%;
}
.v-select.fit .v-select__selection--comma {
  text-overflow: unset;
}
</style>
