<template>
  <NuxtLayout>
    <div>
      <!-- Hero Section with full-width image -->
      <HeroSection
        title="Schützenverein Tradition"
        subtitle="Ein Ort der Ruhe, Tradition und Gemeinschaft seit 1832"
        background-image="https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg"
        height="100vh"
        :show-button="false"
      />
      
      <!-- Section Divider -->
      <div class="section-divider"></div>
      
      <!-- Events Section -->
      <section class="bg-background py-16 section-leaves">
        <VContainer>
          <h2 class="text-h3 text-center font-weight-light mb-16">Unsere Veranstaltungen</h2>
          <VRow>
            <VCol v-for="(event, index) in upcomingEvents" :key="index" cols="12" md="4">
              <VCard class="card-hover h-100" elevation="0">
                <VImg
                  :src="event.image || 'https://images.pexels.com/photos/1125268/pexels-photo-1125268.jpeg'"
                  height="250"
                  cover
                />
                <VCardTitle class="pt-6">{{ event.title }}</VCardTitle>
                <VCardText>
                  <p class="mb-2">{{ event.date }}</p>
                  <p class="mb-6">{{ event.description }}</p>
                  <VBtn
                    color="accent"
                    variant="outlined"
                    :to="'/events'"
                  >
                    Details
                  </VBtn>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VContainer>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup>
const upcomingEvents = ref([]);

onMounted(async () => {
  const eventsData = await queryCollection('events').all();
  console.log(eventsData);
  
  upcomingEvents.value = eventsData
});
</script>

<style scoped>
.testimonial-card {
  background: linear-gradient(135deg, #fff 0%, #F8F8F0 100%);
  border-radius: 2rem;
  min-height: 400px;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: var(--v-accent-base) !important;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: var(--v-accent-base) !important;
}
</style>