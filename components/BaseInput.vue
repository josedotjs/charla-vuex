<template>
  <div>
    <v-text-field v-bind="$attrs" outlined full-width v-on="$listeners" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped></style>
