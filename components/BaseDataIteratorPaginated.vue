<template>
  <data-paginator-provider
    v-slot="{ loading, items, serverError, paginationData }"
    :api="api"
    :options="options"
    :url="apiUrl"
  >
    <div>
      <div v-if="serverError">
        {{ serverError }}
      </div>
      <div v-else>
        <slot name="filters" />
        <v-data-iterator
          v-bind="$attrs"
          :items="items"
          :loading="loading"
          :items-per-page="itemsPerPage[0] || options.limit"
          :page="options.page"
          :server-items-length="paginationData.totalDocs"
          :footer-props="{ 'items-per-page-options': itemsPerPage }"
          @update:options="onUpdateOptions"
          v-on="$listeners"
        >
          <template v-for="(_, slot) of $scopedSlots" #[slot]="scope"
            ><slot :name="slot" v-bind="scope"
          /></template>
        </v-data-iterator>
      </div>
    </div>
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
    itemsPerPage: {
      type: Array,
      default: () => [10, 20, 30, 50],
    },
    queryOptions: {
      type: Object,
      default: () => ({
        select: '',
        sort: '',
      }),
    },
  },
  data() {
    return {
      options: {
        ...this.queryOptions,
      },
    }
  },
  methods: {
    onUpdateOptions(value) {
      console.log('options change', value)
      let sort = {}
      if (value.sortBy.length) {
        // console.log(value.sortBy, value.sortDesc[0])
        const sortOrder = value.sortDesc[0] ? 'desc' : 'asc'
        const key = `${value.sortBy[0]}`
        sort = {
          [key]: sortOrder,
        }
      }
      this.options = {
        ...this.options,
        sort,
        page: value.page,
        limit: value.itemsPerPage,
      }
    },
  },
}
</script>
