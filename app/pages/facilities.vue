<template>
  <NuxtLayout>
    <div>
      <HeroSection
        title="Unsere Räumlichkeiten"
        subtitle="Entdecken Sie unsere historischen und modernen Räumlichkeiten, die für verschiedene Anlässe zur Verfügung stehen."
        background-image="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg"
        height="400"
      />
      
      <VContainer class="py-12">
        <VRow justify="center">
          <VCol cols="12" md="10">
            <div class="text-center mb-12">
              <h2 class="text-h3 font-weight-bold mb-4">Unsere Räumlichkeiten</h2>
              <p class="text-body-1 max-width-700 mx-auto">
                Der Schützenverein verfügt über verschiedene Räumlichkeiten, die sowohl für Vereinsaktivitäten 
                als auch für private Veranstaltungen genutzt werden können. Jede unserer Räumlichkeiten bietet 
                eine einzigartige Atmosphäre und ist mit moderner Ausstattung versehen.
              </p>
            </div>
            
            <VRow>
              <VCol 
                v-for="facility in facilities" 
                :key="facility.id" 
                cols="12" 
                md="6"
                class="mb-4"
              >
                <FacilityCard 
                  :facility="facility"
                  @show-gallery="showGallery"
                  @book-facility="bookFacility"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VContainer>
      
      <!-- Gallery Dialog -->
      <VDialog
        v-model="galleryDialog"
        width="800"
        scrollable
      >
        <VCard>
          <VToolbar color="primary" dark>
            <VToolbarTitle>{{ selectedFacility ? selectedFacility.title : 'Galerie' }}</VToolbarTitle>
            <VSpacer></VSpacer>
            <VBtn icon @click="galleryDialog = false">
              <VIcon>mdi-close</VIcon>
            </VBtn>
          </VToolbar>
          
          <VCardText class="pa-4">
            <ImageGallery v-if="selectedFacility" :images="selectedFacility.gallery" />
          </VCardText>
        </VCard>
      </VDialog>
      
      <!-- Booking Dialog -->
      <VDialog
        v-model="bookingDialog"
        width="900"
        scrollable
        persistent
      >
        <VCard>
          <VToolbar color="primary" dark>
            <VToolbarTitle>
              <VIcon class="mr-2">mdi-calendar-plus</VIcon>
              Buchungsanfrage - {{ selectedFacility ? selectedFacility.title : '' }}
            </VToolbarTitle>
            <VSpacer></VSpacer>
            <VBtn icon @click="closeBookingDialog">
              <VIcon>mdi-close</VIcon>
            </VBtn>
          </VToolbar>
          
          <VCardText class="pa-6">
            <BookingForm 
              v-if="selectedFacility"
              :facility-id="selectedFacility.id"
              :facility-name="selectedFacility.title"
              @booking-submitted="handleBookingSubmitted"
            />
          </VCardText>
        </VCard>
      </VDialog>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const galleryDialog = ref(false);
const bookingDialog = ref(false);
const selectedFacilityId = ref(null);
const facilities = ref([]);

const selectedFacility = computed(() => {
  if (!selectedFacilityId.value) return null;
  return facilities.value.find(f => f.id === selectedFacilityId.value);
});

onMounted(async () => {
  facilities.value = {
      "id": 1,
      "title": "Schützenhalle",
      "description": "Unsere historische Schützenhalle bietet mit ihrer beeindruckenden Holzbalkendecke und großzügigen Fenstern eine einzigartige Atmosphäre für Veranstaltungen jeder Art.",
      "image": "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
      "features": [
        "Bühne mit professioneller Beleuchtung",
        "Vollausgestattete Küche",
        "Bartresen mit Zapfanlage",
        "Flexible Bestuhlung",
        "Historische Dekorationselemente"
      ],
      "capacity": "200",
      "size": "400 m²",
      "gallery": [
        { "src": "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg", "title": "Schützenhalle Panorama" },
        { "src": "https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg", "title": "Festbestuhlung" },
        { "src": "https://images.pexels.com/photos/3050651/pexels-photo-3050651.jpeg", "title": "Bühnenbereich" },
        { "src": "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg", "title": "Bar" },
        { "src": "https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg", "title": "Küche" }
      ]
    };
});

const showGallery = (facilityId) => {
  selectedFacilityId.value = facilityId;
  galleryDialog.value = true;
};

const bookFacility = (facilityId) => {
  selectedFacilityId.value = facilityId;
  bookingDialog.value = true;
};

const closeBookingDialog = () => {
  bookingDialog.value = false;
  // Reset selected facility after a short delay to allow dialog to close smoothly
  setTimeout(() => {
    selectedFacilityId.value = null;
  }, 300);
};

const handleBookingSubmitted = (bookingData) => {
  console.log('Booking submitted:', bookingData);
  closeBookingDialog();
};
</script>

<style scoped>
.max-width-700 {
  max-width: 700px;
}
</style>