<template>
  <fieldset class="item fw">
    <legend>{{ label }}</legend>
    <div>
      <!-- <select class="item-select">
        <option v-for="item in items" :key="item.value" :value="item.value">
          {{ item.text }}
        </option>
      </select> -->
      <input class="item-input fw" type="text" @input="onTextchange" />
    </div>
  </fieldset>
</template>

<script>
import _debounce from 'lodash/debounce'
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
          text: 'Comienza con',
          value: '$eq',
        },
      ],
    }
  },
  methods: {
    onTextchange: _debounce(function (event) {
      let value
      if (event.target.value) {
        value = {
          $regex: `^${event.target.value}`,
          $options: 'i',
        }
      }
      this.$emit('input', event.target.value, this.filterKey, 'string', value)
    }, 500),
  },
}
</script>

<style lang="scss" scoped></style>
