<template>
  <v-select
    v-bind="$attrs"
    placeholder="Seleccione su item"
    :full-width="true"
    v-on="$listeners"
  ></v-select>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      key: ' ',
    }
  },
}
</script>
