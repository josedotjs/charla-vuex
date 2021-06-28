<template>
  <div>
    <v-row>
      <v-col cols="12" lg="6" offset-lg="3" md="8" offset-md="2">
        <document-selector
          v-model="formData.document"
          @change="onChangeDocument"
        />
        <product-selector v-model="formData.product" />
        <document-selector
          v-model="formData.documents"
          multiple
          @change="onChangeDocuments"
        />
        <product-selector v-model="formData.products" multiple />
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
        documents: [],
        products: [],
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
  methods: {
    onChangeDocument() {
      console.log('Document change')
    },
    onChangeDocuments() {
      console.log('Documents change')
    },
  },
}
</script>

<style lang="scss" scoped></style>
