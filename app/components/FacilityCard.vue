<template>
  <VCard class="facility-card h-100" elevation="3">
    <VImg :src="facility.image" :alt="facility.title" height="220" cover />
    <VCardTitle class="text-h5 font-weight-bold">{{ facility.title }}</VCardTitle>
    <VCardText>
      <p class="text-body-1 mb-3">{{ facility.description }}</p>
      <div v-if="facility.features && facility.features.length" class="mb-4">
        <p class="text-subtitle-2 font-weight-bold mb-2">Ausstattung:</p>
        <ul class="pa-0 ml-4">
          <li v-for="(feature, index) in facility.features" :key="index" class="mb-1">
            {{ feature }}
          </li>
        </ul>
      </div>
      <div v-if="facility.capacity" class="d-flex align-center mb-2">
        <VIcon size="small" color="primary" class="mr-2">mdi-account-group</VIcon>
        <span>Kapazität: {{ facility.capacity }} Personen</span>
      </div>
      <div v-if="facility.size" class="d-flex align-center">
        <VIcon size="small" color="primary" class="mr-2">mdi-ruler-square</VIcon>
        <span>Größe: {{ facility.size }}</span>
      </div>
    </VCardText>
    <VCardActions>
      <VSpacer />
      <VBtn
        color="primary"
        variant="tonal"
        @click="$emit('showGallery', facility.id)"
      >
        Galerie ansehen
      </VBtn>
      <VBtn
        color="accent"
        @click="$emit('bookFacility', facility.id)"
      >
        Jetzt buchen
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup>
defineProps({
  facility: {
    type: Object,
    required: true
  }
});

defineEmits(['showGallery', 'bookFacility']);
</script>

<style scoped>
.facility-card {
  transition: all 0.3s ease;
}

.facility-card:hover {
  box-shadow: 0 8px 20px rgba(74, 103, 65, 0.15) !important;
  background: linear-gradient(135deg, #fff 0%, #F5F5F0 100%) !important;
}
</style>