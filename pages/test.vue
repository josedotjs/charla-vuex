<template>
  <div>
    <v-row>
      <v-col cols="12" lg="6" offset-lg="3" md="8" offset-md="2">
        <document-selector v-model="formData.document" />
        <product-selector v-model="formData.product" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        document: '',
        product: '',
      },
    }
  },
  async created() {
    console.time('loading')
    await Promise.all([
      this.$store.dispatch('document/getAll'),
      this.$store.dispatch('products/getProducts'),
    ])
    // await this.$store.dispatch('document/getAll')
    // await this.$store.dispatch('products/getProducts')
    console.timeEnd('loading')
  },
}
</script>

<style lang="scss" scoped></style>
