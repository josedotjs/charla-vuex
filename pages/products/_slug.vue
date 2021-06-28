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
            <v-btn
              color="primary"
              :loading="isSaving"
              :disabled="isSaving"
              @click="save"
              >Guardar</v-btn
            >
            <v-btn
              color="error"
              :loading="isSaving"
              :disabled="isSaving"
              to="/products"
              >Volver</v-btn
            >
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { create } from '@/services/products'
export default {
  data() {
    return {
      formData: {
        name: '',
        description: '',
        price: 0,
      },
      isSaving: false,
    }
  },
  methods: {
    clearForm() {
      this.formData = {
        name: '',
        description: '',
        price: 0,
      }
    },
    async save() {
      try {
        this.isSaving = true
        const product = await this.$api.post('/products', this.formData)
        this.$toasted.show('Registro guardado', product.id)
      } catch (e) {
        this.$toasted.show('Error')
      } finally {
        this.isSaving = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
