<template>
  <v-container>
    <!-- <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <base-input v-model="test" outlined placeholder="Placeholder" />
          <document-selector
            v-model="selectedDocument"
            multiple
            deletable
            outlined
            placeholder="Test index"
          />
          <base-select outlined label="Base select" />
          <v-btn @click="testApi">Test api</v-btn>
        </div>
      </v-col>
    </v-row> -->
    <v-row v-if="loading">
      <v-col>
        <v-progress-linear indeterminate color="cyan"></v-progress-linear>
      </v-col>
    </v-row>
    <v-row align="stretch">
      <v-col
        v-for="product in products"
        :key="product.id"
        sm="12"
        md="4"
        lg="3"
      >
        <order-item :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      test: '',
      items: [1, 2, 3, 4, 5],
      selectedDocument: [1, 2],
    }
  },
  computed: {
    message() {
      return this.$store.state.test.message
    },
    products() {
      return this.$store.state.productsapi.products
    },
    loading() {
      return this.$store.state.productsapi.loading
    },
  },
  created() {
    this.$store.dispatch('productsapi/getProducts')
    console.log(Object.keys(this.$options))
  },
  methods: {
    testApi() {
      console.log('aaa')
    },
  },
}
</script>
