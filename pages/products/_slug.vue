<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="8" lg="6" offset-lg="3" offset-md="2">
        <v-form>
          <base-input v-model="formData.name" label="Nombre" />
          <base-text-area v-model="formData.description" label="Descripción" />
          <base-input
            v-model.number="formData.price"
            class="text-right"
            type="number"
            label="Precio"
          />
          <div class="pa-8 text-center">
            <v-btn color="primary" @click="save">Guardar</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { create } from '@/services/products'
export default {
  data() {
    return {
      formData: {
        name: '',
        description: '',
        price: 0,
      },
    }
  },
  methods: {
    save() {
      create(this.formData)
        .then(() => {
          this.$router.push({
            path: '/products',
          })
        })
        .catch((e) => console.error(e))
    },
  },
}
</script>

<style lang="scss" scoped></style>
