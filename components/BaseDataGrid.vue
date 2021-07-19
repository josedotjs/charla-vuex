<template>
  <data-grid-provider
    v-slot="{
      loading,
      items,
      serverError,
      generateExcel,
      generatingExcel,
      paginationData,
    }"
    :options="options"
    :url="apiUrl"
  >
    <div>
      <div v-if="serverError">
        {{ serverError }}
      </div>
      <div v-else>
        <v-btn :loading="generatingExcel" @click="generateExcel">
          Generar excel
        </v-btn>
        <slot name="filters" />
        <v-data-table
          :items="items"
          :loading="loading"
          :items-per-page="options.limit"
          :page="options.page"
          :server-items-length="paginationData.totalDocs"
          v-bind="$attrs"
          @update:options="onUpdateOptions"
          v-on="$listeners"
        >
          <template v-slot:item.price="{ item }"> $ {{ item.price }} </template>
        </v-data-table>
      </div>
    </div>
  </data-grid-provider>
</template>

<script>
export default {
  filters: {
    currency(value) {
      return parseFloat(value).toFixed(2)
    },
  },
  inheritAttrs: false,
  props: {
    apiName: {
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
  data() {
    return {
      options: {
        ...this.queryOptions,
      },
    }
  },
  methods: {
    onUpdateOptions(value) {
      console.log('options', value)
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
