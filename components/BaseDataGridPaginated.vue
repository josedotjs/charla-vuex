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
          <v-row class="d-flex flex-row">
            <v-col
              v-for="filter in tableFilters"
              :key="filter.value"
              cols="12"
              lg="3"
              md="6"
            >
              <component
                :is="filter.filterType"
                v-model="filter.filterValue"
                :filter-key="filter.value"
                :label="filter.text"
                :items="filter.items"
                :api="filter.api"
                :api-url="filter.apiUrl"
                :item-text="filter.itemText"
                :item-value="filter.itemValue"
                @input="onFilterChange"
              />
            </v-col>
          </v-row>
        </slot>
        <component
          :is="componentType"
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
          <template v-if="isIterator" #header>
            <v-toolbar class="pa-4">
              <div>Test</div>
            </v-toolbar>
          </template>
          <template v-for="(_, slot) of $scopedSlots" #[slot]="scope"
            ><slot :name="slot" v-bind="scope"
          /></template>
        </component>
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
    componentType: {
      type: String,
      default: 'v-data-table',
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
    console.log('data')
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
    isDataTable() {
      return this.componentType === 'v-data-table'
    },
    isIterator() {
      return this.componentType === 'v-data-iterator'
    },
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
      console.log('onFilterChange', val, key, filterValue)
      if (filterValue !== null && filterValue !== undefined) {
        this.$set(this.options.query, key, filterValue)
      } else {
        const query = { ...this.options.query }
        delete query[key]
        this.$set(this.options, 'query', query)
      }
      console.log('new query', this.options.query)
      this.options.page = 1
      this.$emit('filter-change', { ...this.query, ...this.options })
    },
    onUpdateOptions(value) {
      let sortField
      let sortValue

      if (value.sortBy[0]) {
        sortField = value.sortBy[0]
        sortValue = value.sortDesc[0] ? -1 : 1
      } else {
        sortField = '_id'
        sortValue = -1
      }
      const sort = {
        [sortField]: sortValue,
      }
      console.log('update', value, sort)
      this.options = {
        ...this.options,
        page: value.page,
        limit: value.itemsPerPage,
        sort,
      }
    },
  },
}
</script>
