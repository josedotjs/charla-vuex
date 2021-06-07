<template>
  <v-container>
    <v-row>
      <v-col class="text-right">
        <v-btn :to="newRoute" :nuxt="true">Nuevo</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="8" lg="6" offset-lg="3" offset-md="2">
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    newRoute: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
