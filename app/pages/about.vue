<template>
  <NuxtLayout>
    <div>
      <HeroSection
        title="Über uns"
        subtitle="Tradition seit 1832 - erfahren Sie mehr über unsere Geschichte und Werte"
        background-image="https://images.pexels.com/photos/4456987/pexels-photo-4456987.jpeg"
        height="400"
      />
      
      <VContainer class="py-12">
        <div class="content-wrapper">
            <SectionTitle
              title="Unsere Geschichte"
              subtitle="Eine Tradition, die bis ins Jahr 1832 zurückreicht"
            />
            
            <div class="history-section mb-12">
              <div class="history-content">
                <div class="text-body-1">
                  <p class="mb-4">
                    Der Schützenverein wurde im Jahr 1832 von einer Gruppe von Handwerkern und Bürgern gegründet, 
                    die die Tradition des Schützenwesens bewahren wollten. In einer Zeit politischer Umbrüche 
                    stand der Verein für bürgerliche Werte und Gemeinschaft.
                  </p>
                  <p class="mb-4">
                    Über die Jahrzehnte entwickelte sich der Verein zu einer festen Institution in der Region. 
                    Traditionelle Feste wie das Schützenfest im Sommer und das Königsschießen haben sich bis 
                    heute erhalten und sind wichtige gesellschaftliche Ereignisse in unserem Ort.
                  </p>
                  <p>
                    Heute verbinden wir stolz unsere lange Tradition mit modernen Trainingsmethoden und 
                    zeitgemäßer Ausstattung, um sowohl erfahrenen Schützen als auch Neueinsteigern 
                    optimale Bedingungen zu bieten.
                  </p>
                </div>
              </div>
              
              <div class="history-image">
                <VImg
                  src="https://images.pexels.com/photos/2604792/pexels-photo-2604792.jpeg"
                  height="300"
                  cover
                  class="rounded-lg"
                />
              </div>
            </div>
            
            <VTimeline 
              density="default" 
              class="mt-12 mb-8"
            >
              <VTimelineItem
                v-for="(milestone, index) in milestones"
                :key="milestone.year"
                :dot-color="index % 2 === 0 ? 'primary' : 'accent'"
                :size="index % 2 === 0 ? 'default' : 'x-small'"
                fill-dot
                class="mb-4"
              >
                <VCard elevation="2">
                  <VCardTitle 
                    :class="[
                      index % 2 === 0 ? 'bg-primary' : 'bg-accent',
                      index % 2 === 0 ? '' : 'justify-end'
                    ]"
                  >
                    <h2 
                      :class="[
                        'font-weight-light text-white',
                        index % 2 === 0 ? '' : 'me-4'
                      ]"
                    >
                      {{ milestone.year }} - {{ milestone.title }}
                    </h2>
                  </VCardTitle>
                  <VCardText class="pa-4">
                    <p class="text-body-1 mb-0">{{ milestone.description }}</p>
                  </VCardText>
                </VCard>
              </VTimelineItem>
            </VTimeline>
        </div>
      </VContainer>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const milestones = ref([]);

onMounted(async () => {
  const milestonesData = await queryCollection('milestones').all();
  milestones.value = milestonesData;
});
</script>

<style scoped>
.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
}

.history-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
}

@media (max-width: 768px) {
  .history-section {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.value-item {
  display: flex;
}

.timeline-content {
  transition: all 0.3s ease;
  max-width: 500px;
}

.timeline-content:hover {
  box-shadow: 0 8px 20px rgba(74, 103, 65, 0.15) !important;
  transform: translateY(-2px);
}

.value-card {
  transition: all 0.3s ease;
}

.value-card:hover {
  box-shadow: 0 8px 20px rgba(74, 103, 65, 0.15) !important;
  background: linear-gradient(135deg, #fff 0%, #F5F5F0 100%) !important;
}
</style>