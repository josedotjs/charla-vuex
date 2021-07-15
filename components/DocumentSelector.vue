<template>
  <base-select
    :items="documents"
    :value="value"
    :loading="loading"
    item-value="id"
    item-text="value"
    placeholder="Seleccione un documento"
    v-bind="$attrs"
    v-on="customListeners"
    @click:append-outer="refresh"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseSelect from './BaseSelect.vue'

export default {
  components: {
    BaseSelect,
  },
  inheritAttrs: false,

  props: {
    value: {
      required: true,
      type: [String, Array, Number],
    },
  },
  computed: {
    customListeners() {
      const vm = this
      return {
        ...this.$listeners,
        input: (event) => {
          vm.$emit('input', event)
        },
      }
    },
    ...mapState({
      documents: (state) => state.document.documents,
      loading: (state) => state.document.loading,
    }),
  },
  created() {
    // this.$store.dispatch('document/getAll')
  },

  methods: {
    refresh() {
      this.$store.dispatch('document/getAll')
    },
  },
}
</script>
