<template>
  <base-data-grid
    api-name="$apiMongoose"
    api-url="/products/query"
    :query-options="options"
    :headers="headers"
    @pagination="onPagination"
  />
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'Nombre',
          value: 'name',
        },
        {
          text: 'Categoría',
          value: 'category.name',
          sortable: false,
        },
        {
          text: 'Precio',
          value: 'price',
          align: 'end',
        },
      ],
      options: {
        select: 'name price',
        populate: {
          path: 'category',
          select: 'name',
        },
      },
    }
  },
  methods: {
    onPagination(value) {
      console.log('pagination')
      this.options.page = value.page
    },
  },
}
</script>
