<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn class="mr-4" icon @click.stop="rightDrawer = !rightDrawer">
        <v-badge :content="itemsCount">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <!-- <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item> -->
        <v-list-item v-for="(cartItem, idx) in cart" :key="idx">
          <v-list-item-title>{{ cartItem.product.name }}</v-list-item-title>
          <v-list-item-subtitle
            ><v-btn elevation="2" x-small @click="addToCart(cartItem.product)"
              >+</v-btn
            >
            {{ cartItem.quantity }}
            <v-btn elevation="2" x-small>-</v-btn></v-list-item-subtitle
          >
        </v-list-item>
        <v-list-item v-if="cart.length">
          <v-list-item-content>
            <v-btn color="error" block @click.stop="showDialog = true"
              >Vaciar carrito</v-btn
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else>
          <v-list-item-content> El carrito está vacío </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-dialog v-model="showDialog" max-width="290">
        <v-card>
          <v-card-title class="text-h6"> Confirmar operación </v-card-title>

          <v-card-text>
            Se perderán todos los datos del carrito. ¿Desea continuar?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="showDialog = false">
              No
            </v-btn>

            <v-btn color="red darken-1" text @click="emptyCart">
              Si, eliminar carrito
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Productos',
          to: '/products',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Demo ',
      showDialog: false,
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart.cart
    },
    itemsCount() {
      return this.$store.getters['cart/itemsCount']
    },
  },
  methods: {
    emptyCart() {
      this.$store.dispatch('cart/empty')
      this.showDialog = false
      this.rightDrawer = false
    },
    addToCart(product) {
      this.$store.dispatch('cart/addToCart', product)
    },
  },
}
</script>
