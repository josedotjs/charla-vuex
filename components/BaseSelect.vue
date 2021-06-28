<template>
  <v-select
    v-bind="$attrs"
    outlined
    :full-width="true"
    append-outer-icon="mdi-refresh"
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
