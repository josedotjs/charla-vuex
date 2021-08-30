<template>
  <data-paginator-provider
    v-slot="{ loading, items, serverError }"
    :api="api"
    :options="options"
    :url="apiUrl"
  >
    <base-select
      :items="items"
      :loading="loading"
      :error-messages="serverError"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </data-paginator-provider>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
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
    options() {
      return {
        query: {},
        ...this.queryOptions,
        pagination: false,
        useEstimatedCount: true,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
