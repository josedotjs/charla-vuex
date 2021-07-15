<template>
  <div>
    <v-row>
      <v-col cols="12" lg="6" offset-lg="3" md="8" offset-md="2">
        <document-selector
          v-model="formData.document"
          @change="onChangeDocument"
        />
        <!-- <document-selector
          v-model="formData.documents"
          multiple
          @change="onChangeDocuments"
        /> -->
        <products-api-selector v-model="formData.productApi" />

        <product-selector
          v-model="formData.simpleProduct"
          :rules="[(v) => !!v || 'Debe seleccionar un producto']"
          clearable
        />

        <!-- 
        <product-selector
          v-model="formData.productsFilter"
          multiple
          chips
          deletable-chips
        />
        <product-selector
          v-model="formData.products"
          multiple
          :rules="[
            (v) => v.length > 0 || 'Debe seleccionar al menos un producto',
          ]"
        />
        <base-input v-mask="'#### #### #### ####'" reverse />
        <base-input reverse /> -->
        <!-- <product-selector v-model="formData.product" /> -->
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
        productsFilter: [],
        productApi: '',
        simpleProduct: '',
      },
    }
  },
  async created() {
    console.time('loading')
    await Promise.all([
      this.$store.dispatch('document/getAll'),
      this.$store.dispatch('productsapi/getProducts'),
    ])
    // await this.$store.dispatch('document/getAll')
    // await this.$store.dispatch('productsapi/getProducts')
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
