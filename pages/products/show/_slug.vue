<template>
  <v-container>
    <v-row>
      <v-col v-if="product" cols="12" lg="6" offset-lg="3" md="8" offset-md="2">
        <h4>{{ product.name }}</h4>
        <p>
          {{ product.description }}
        </p>
        <p>Precio: {{ product.price }}</p>
        <v-btn to="/" nuxt link> Volver </v-btn>
      </v-col>
      <v-col v-else>
        <v-progress-linear indeterminate color="green"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      loading: false,
    }
  },
  async mounted() {
    try {
      this.loading = true
      const id = this.$route.params.slug
      const { data } = await this.$api.get(`/products/${id}`)
      this.product = data
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  },
}
</script>

<style lang="scss" scoped></style>
