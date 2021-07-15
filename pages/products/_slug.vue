<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="8" lg="6" offset-lg="3" offset-md="2">
        <v-form>
          <base-input v-model="formData.name" label="Nombre" />
          <base-text-area v-model="formData.description" label="Descripción" />
          <base-input
            v-model.number="formData.price"
            reverse
            type="number"
            label="Precio"
          />
          <base-input v-model="formData.secretField" label="Campo secreto" />
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
        secretField: '',
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
        const product = await this.$apiMongoose.post('/products', this.formData)
        this.$toasted.show('Registro guardado', product.id)
        this.$router.push('/products')
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
