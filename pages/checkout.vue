<template>
  <v-container>
    <v-row v-if="cart.length">
      <v-col cols="12" md="8" lg="6" offset-lg="3" offset-md="2">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Producto</th>
                <th class="text-left">Cantidad</th>
                <th class="text-left">Precio unitario</th>
                <th class="text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in mappedCart" :key="item.product.id">
                <td>{{ item.product.name }}</td>
                <td>
                  <v-btn x-small @click="addToCart(item.product)">+</v-btn>
                  {{ item.quantity }}
                  <v-btn x-small>-</v-btn>
                </td>
                <td>{{ item.product.price }}</td>
                <td>{{ item.subtotal }}</td>
              </tr>
              <tr>
                <td colspan="3">Envío:</td>
                <td>{{ shippingPrice }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-radio-group v-model="selectedShipping" row>
          <v-radio
            v-for="shipping in shippingOptions"
            :key="shipping.id"
            :label="shipping.label"
            :value="shipping.id"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="8" lg="6" offset-lg="3" offset-md="2">
        <v-alert type="warning"
          >Todavía no se han agregado items en el carrito</v-alert
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      shippingOptions: [
        {
          id: 0,
          label: 'Envío gratis (4-5 días hábiles)',
          price: 0,
        },
        {
          id: 1,
          label: 'Envío express (1-2 días hábiles)',
          price: 100,
        },
      ],
      selectedShipping: 0,
    }
  },
  computed: {
    shippingPrice() {
      return this.shippingOptions[this.selectedShipping].price
    },
    mappedCart() {
      return this.cart.map((item) => {
        return {
          ...item,
          subtotal: item.quantity * item.product.price,
        }
      })
    },
    ...mapState({
      cart: (state) => state.cart.cart,
    }),
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('cart/addToCart', product)
    },
  },
}
</script>

<style lang="scss" scoped></style>
