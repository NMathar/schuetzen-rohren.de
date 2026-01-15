<template>
  <NuxtLayout>
    <div>
      <HeroSection
        :title="facilitiesPageDate.entry.raeumlichkeitenInhalt[0].title"
        :subtitle="facilitiesPageDate.entry.raeumlichkeitenInhalt[0].untertitel ? facilitiesPageDate.entry.raeumlichkeitenInhalt[0].untertitel : ''"
        :background-image="facilitiesPageDate.entry.raeumlichkeitenInhalt[0].bild[0].url"
        height="400"
        :show-button="false"
      />
      
      <VContainer class="py-12">
        <VRow justify="center">
          <VCol cols="12" md="10">
            <div class="text-center mb-12">
              <SectionTitle
                :title="facilitiesPageDate.entry.raeumlichkeitenInhalt[1].title"
                :subtitle="facilitiesPageDate.entry.raeumlichkeitenInhalt[1].untertitel ? facilitiesPageDate.entry.raeumlichkeitenInhalt[1].untertitel : ''"
              />
            </div>

            <VRow>
              <Galerie 
                :images="facilitiesPageDate.entry.raeumlichkeitenInhalt[2].bilder.map(image => image.url)"
              ></Galerie>
            </VRow>  
            
            <!-- <VRow>
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
            </VRow> -->
          </VCol>
        </VRow>
      </VContainer>
      
      <!-- Gallery Dialog -->
      <!-- <VDialog
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
      </VDialog> -->
      
      <!-- Booking Dialog -->
      <!-- <VDialog
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
      </VDialog> -->
    </div>
  </NuxtLayout>
</template>

<script setup>
const galleryDialog = ref(false);
const bookingDialog = ref(false);
const selectedFacilityId = ref(null);


const { data: facilitiesPageDate, error, pending, refresh } = await useAsyncGql({
  operation: 'GetFacilitiesPageData',
})

if (error.value) {
  // eslint-disable-next-line no-console
  console.error(error.value)
}

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