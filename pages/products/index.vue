<template>
  <entity-index new-route="/products/new">
    <v-data-table :items="products" :headers="headers" :loading="loading">
      <template #item.id="{ item }">
        <v-btn :to="`/products/${item.id}`" small nuxt
          ><v-icon small>mdi-pencil</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </entity-index>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Precio', value: 'price' },
        { text: 'Acciones', value: 'id' },
      ],
    }
  },
  computed: {
    products() {
      return this.$store.state.products.products
    },
    loading() {
      return this.$store.state.products.loading
    },
  },
  created() {
    this.$store.dispatch('products/getProducts')
  },
}
</script>

<style lang="scss" scoped></style>
