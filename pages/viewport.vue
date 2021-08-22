<template>
  <div>
    <v-row>
      <v-col>
        <VueTrix
          v-model="editorContent"
          placeholder="Enter content"
          localStorage
        />
      </v-col>
    </v-row>
    <v-btn
      v-for="viewport in viewports"
      :key="viewport"
      @click="currentViewport = viewport"
    >
      {{ viewport }}
    </v-btn>
    <v-sheet
      class="pa-6"
      :width="currentViewport"
      color="white"
      height="400"
      elevation="1"
    >
      Test
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentViewport: 320,
      viewports: [320, 480, 640, 800],
      editorContent: '',
    }
  },
}
</script>

<style lang="scss" scoped></style>
