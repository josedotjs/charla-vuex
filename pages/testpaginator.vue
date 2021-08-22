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
    <!-- <base-data-iterator-paginated
      api="$apiPaginator"
      api-url="/paginator"
      :query-options="options"
      :itemsPerPage="[6, 12, 24]"
      item-key="_id"
      @pagination="onPagination"
    >
      <template v-slot:default="{ items }">
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
    </base-data-iterator-paginated> -->
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
      date: [],
    }
  },
  computed: {
    tableFilters() {
      return this.dataHeaders.filter((header) => header.showInFilters)
    },
  },
}
</script>

<style lang="scss" scoped></style>
