<template>
  <fieldset class="item d-flex flex-row fw">
    <legend>{{ label }}</legend>
    <date-picker
      :range="true"
      class="fw"
      value-type="timestamp"
      :shortcuts="shortcuts"
      v-bind="$attrs"
      v-on="customListeners"
    />
  </fieldset>
</template>

<script>
import dayjs from 'dayjs'

export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: 'Fecha',
    },
    filterKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      config: {
        // wrap: true, // set wrap to true only when using 'input-group'
        mode: 'range',
        altFormat: 'M j, Y',
        altInput: true,
        dateFormat: 'Z',
      },
      shortcuts: [
        {
          text: 'Hoy',
          onClick: () => {
            const dates = [dayjs().startOf('day').toDate(), new Date()]
            return dates
          },
        },
        {
          text: 'Últimos 7 días',
          onClick: () => {
            const dates = [
              dayjs().add(-7, 'days').startOf('day').toDate(),
              dayjs().endOf('day').toDate(),
            ]
            return dates
          },
        },
        {
          text: 'Últimos 30 días',
          onClick: () => {
            const dates = [
              dayjs().add(-30, 'days').startOf('day').toDate(),
              dayjs().endOf('day').toDate(),
            ]
            return dates
          },
        },
      ],
    }
  },
  computed: {
    customListeners() {
      return {
        ...this.$listeners,
        input: this.customInput,
      }
    },
  },
  methods: {
    customInput(e) {
      // console.log('custom input')
      //
      let value
      if (e[0] && e[1]) {
        value = {
          $gte: e[0],
          $lte: e[1],
        }
      }
      this.$emit('input', e, this.filterKey, 'date', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  font-size: 0.8rem;
  border: 0;
  margin-right: 0.5rem;
}
.item-input {
  padding: 0.8rem;
  border: 1px solid #ccc;
}
</style>
