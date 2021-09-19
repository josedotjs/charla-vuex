<template>
  <div>
    <base-data-grid-paginated
      api="$apiPaginator"
      api-url="/paginator"
      :select-fields="selectFields"
      :headers="dataHeaders"
      :expanded.sync="expanded"
      :single-expand="true"
      :table-filters="tableFilters"
      show-expand
      @filter-change="onFilterChange"
    >
      <template #item.firstName="{ item }">
        <b>{{ item.firstName }}</b>
      </template>
      <template #item.birthDate="{ item }">
        🎂{{ item.birthDate | dateFormater }}
      </template>
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <b>Mascotas: </b> {{ item.pets.join(', ') }}
        </td>
      </template>
    </base-data-grid-paginated>
    <base-select-populated
      api="$apiPaginator"
      api-url="/paginator"
      :query-options="optionsSelect"
      :item-text="(item) => `${item.firstName} ${item.lastName}`"
    />
    <!-- <base-data-grid-paginated
      api="$apiPaginator"
      api-url="/paginator"
      :items-per-page="[6, 12, 24]"
      :select-fields="selectFields"
      component-type="v-data-iterator"
    >
      <template #default="{ items }">
        <v-container>
          <v-row>
            <v-col
              v-for="item in items"
              :key="item._id"
              cols="12"
              lg="3"
              md="4"
            >
              <v-card class="pa-6">
                <span>{{ item.firstName }}</span> <b>{{ item.lastName }}</b>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </base-data-grid-paginated> -->
  </div>
</template>

<script>
import { FILTER_TYPES } from '@/utils/constants'
export default {
  filters: {
    dateFormater(value) {
      return new Date(value).toLocaleDateString()
    },
  },
  data() {
    return {
      queryFilters: {
        firstName: '',
      },
      expanded: [],
      dataHeaders: [
        {
          text: 'Nombre',
          value: 'firstName',
          showInFilters: true,
          filterType: FILTER_TYPES.String,
          filterValue: '',
        },
        {
          text: 'Apellido',
          value: 'lastName',
          showInFilters: true,
          filterType: FILTER_TYPES.String,
          filterValue: '',
        },
        {
          text: 'Fecha de nacimiento',
          value: 'birthDate',
          showInFilters: true,
          filterType: FILTER_TYPES.Date,
          filterValue: null,
        },
        {
          text: 'Acciones',
          value: '_id',
        },
      ],
      selectFields: 'firstName lastName birthDate pets',
      optionsSelect: {
        select: 'firstName lastName',
        sort: {
          firstName: 1,
        },
      },
    }
  },
  computed: {
    customFilters() {
      return [
        {
          value: 'pets',
          filterType: FILTER_TYPES.ComboMultiple,
          filterValue: null,
          text: 'Mascota',
          items: [
            {
              text: 'Bracco Italiano',
              value: 'Bracco Italiano',
            },
            {
              text: 'Devon Rex',
              value: 'Devon Rex',
            },
          ],
        },
        {
          value: 'active',
          filterType: FILTER_TYPES.Boolean,
          filterValue: null,
          text: 'Estado',
        },
        {
          text: 'Label',
          value: '_id',
          filterType: FILTER_TYPES.ComboPopulated,
          filterValue: null,
          api: '$apiPaginator',
          apiUrl: '/paginator',
          queryOptions: this.optionsSelect,
          itemText: (item) => `${item.firstName} ${item.lastName}`,
          itemValue: '_id',
        },
        {
          value: 'accountBalance',
          filterType: FILTER_TYPES.Numeric,
          filterValue: ['0'],
          text: 'Test',
        },
      ]
    },
    tableFilters() {
      return [
        ...this.dataHeaders.filter((header) => header.showInFilters),
        ...this.customFilters,
      ]
    },
  },
  methods: {
    onFilterChange(vals) {
      console.log('onFilterChange', vals)
    },
  },
}
</script>

<style lang="scss" scoped></style>
