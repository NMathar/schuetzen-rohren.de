<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(image, index) in images"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card @click="openImage(image)" class="cursor-pointer">
          <v-img
            :src="image"
            aspect-ratio="1"
            cover
          />
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog für vergrößertes Bild -->
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-img :src="selectedImage" aspect-ratio="1.5" cover />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Schließen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)
const selectedImage = ref(null)

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

function openImage(image) {
  selectedImage.value = image
  dialog.value = true
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
