<template>
  <base-select-populated
    v-bind="$attrs"
    multiple
    :api="api"
    :api-url="apiUrl"
    :query-options="queryOptions"
    v-on="customListeners"
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    filterKey: {
      type: String,
      required: true,
    },
    api: {
      type: String,
      default: '$api',
    },
    apiUrl: {
      type: String,
      required: true,
    },
    queryOptions: {
      type: Object,
      default: () => ({
        select: '',
        sort: '',
      }),
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
}
</script>

<style lang="scss" scoped></style>
