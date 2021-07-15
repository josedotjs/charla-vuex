<template>
  <v-select
    v-bind="$attrs"
    outlined
    loader-height="5"
    :full-width="true"
    append-outer-icon="mdi-refresh"
    v-on="$listeners"
  ></v-select>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {}
  },
}
</script>
