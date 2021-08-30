<template>
  <base-input
    dense
    class="flex-grow-1"
    v-bind="$attrs"
    v-on="$listeners"
    :label="label"
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
      class="flex-grow-1"
      dense
    />
  </base-input>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
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
