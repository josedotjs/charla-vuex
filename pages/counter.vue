<template>
  <v-card class="pa-8 text-center">
    <v-row>
      <v-col>
        <h1>{{ counter }}</h1>
      </v-col>
      <v-col>
        <v-text-field v-model.number="incrementValue" type="number" />
        <v-btn @click="increment(incrementValue)">Incrementar</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      incrementValue: 1,
    }
  },
  computed: {
    ...mapState({
      counter: (state) => state.counter.counter,
    }),
  },
  methods: {
    ...mapActions('counter', ['increment']),
  },
}
</script>

<style lang="scss" scoped></style>
