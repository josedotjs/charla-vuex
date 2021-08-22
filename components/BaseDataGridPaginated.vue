<template>
  <data-paginator-provider
    v-slot="{
      loading,
      items,
      serverError,
      generateExcel,
      generatingExcel,
      paginationData,
    }"
    :api="api"
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
        <slot name="filters">
          <div v-for="filter in tableFilters" :key="filter.value">
            <component
              :is="filter.filterType"
              v-model="filter.filterValue"
              :filter-key="filter.value"
              :label="filter.text"
              @input="onFilterChange"
            />
          </div>
        </slot>
        <v-data-table
          v-bind="$attrs"
          :items="items"
          :loading="loading"
          :items-per-page="itemsPerPage[0] || options.limit"
          :page.sync="options.page"
          :server-items-length="paginationData.totalDocs"
          :footer-props="{ 'items-per-page-options': itemsPerPage }"
          @update:options="onUpdateOptions"
          v-on="$listeners"
        >
          <template v-for="(_, slot) of $scopedSlots" #[slot]="scope"
            ><slot :name="slot" v-bind="scope"
          /></template>
        </v-data-table>
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
    tableFilters: {
      type: Array,
      default: () => [],
    },
    selectFields: {
      type: String,
      default: '',
    },
  },
  data() {
    // console.log('data', this.queryOptions)
    // const sortKey = Object.keys(this.queryOptions.sort)[0] || '_id'
    // const sortDesc = this.queryOptions.sort === -1
    return {
      options: {
        query: {},
        sort: {
          _id: -1,
        },
        limit: this.itemsPerPage[0],
        select: this.selectFields,
      },
    }
  },
  computed: {
    sort() {
      if (!this.sortBy && !this.sortDesc) {
        return {
          _id: -1,
        }
      }
      return {
        [this.sortBy || '_id']: this.sortDesc ? -1 : 1,
      }
    },
  },
  methods: {
    onFilterChange(val, key, type, filterValue) {
      console.log('onFilterChange', val, key)
      this.$set(this.options.query, key, filterValue)
      // if (type === 'date') {
      //   const dateFilter = {
      //     $gte: val[0],
      //     $lte: val[1],
      //   }
      //   this.$set(this.options.query, key, dateFilter)
      // } else if (type === 'boolean') {
      //   console.log('to be continued')
      // } else {
      //   this.$set(this.options.query, key, {
      //     $regex: `^${val}`,
      //     $options: 'i',
      //   })
      // }
      this.options.page = 1
    },
    onUpdateOptions(value) {
      console.log('update', value)
      this.options = {
        ...this.options,
        page: value.page,
        limit: value.itemsPerPage,
      }
    },
  },
}
</script>
