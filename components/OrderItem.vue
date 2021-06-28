<template>
  <v-card class="mx-auto" full-width>
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://images.pexels.com/photos/4085266/pexels-photo-4085266.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ></v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 text-subtitle-1">$ • {{ product.price }}</div>

      <div style="overflow-y: auto; height: 100px">
        {{ product.description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-badge icon="mdi-cart" :content="quantityInCart">
        <v-btn color="deep-purple lighten-2" text @click="addToCart">
          Agregar al carrito
        </v-btn>
      </v-badge>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    cart() {
      return this.$store.state.cart.cart
    },
    quantityInCart() {
      const item = this.cart.find(
        (cartItem) => cartItem.product.id === this.product.id
      )
      return item ? item.quantity : 0
    },
  },
  methods: {
    addToCart() {
      this.$store.dispatch('cart/addToCart', this.product)
    },
  },
}
</script>

<style lang="scss" scoped></style>
