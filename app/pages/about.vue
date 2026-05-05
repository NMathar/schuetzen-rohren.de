<template>
  <NuxtLayout>
    <div>
      <HeroSection
        :title="aboutPageDate.entry.aboutInhalt[0].title"
        :subtitle="aboutPageDate.entry.aboutInhalt[0].untertitel ? aboutPageDate.entry.aboutInhalt[0].untertitel : ''"
        :background-image="aboutPageDate.entry.aboutInhalt[0].bild[0].url"
        height="400"
        :show-button="false"
      />
      
      <VContainer class="py-12">
        <div class="content-wrapper">
            <SectionTitle
              :title="aboutPageDate.entry.aboutInhalt[1].title"
              :subtitle="aboutPageDate.entry.aboutInhalt[1].untertitel ? aboutPageDate.entry.aboutInhalt[1].untertitel : ''"
            />
            
            <div class="history-section mb-12">
              <div class="history-content">
                <div class="text-body-1" v-html="aboutPageDate.entry.aboutInhalt[1].text">
                </div>
              </div>
              
              <div class="history-image" v-if="aboutPageDate.entry.aboutInhalt[1].bild">
                <VImg
                  :src="aboutPageDate.entry.aboutInhalt[1].bild[0].url"
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
                v-for="(milestone, index) in aboutPageDate.entry.meilensteine"
                :key="milestone.jahr"
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
                      {{ milestone.jahr }} - {{ milestone.title }}
                    </h2>
                  </VCardTitle>
                  <VCardText class="pa-4">
                    <p class="text-body-1 mb-0" v-html="milestone.beschreibung"></p>
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

const { data: aboutPageDate, error, pending, refresh } = await useAsyncGql({
  operation: 'GetAboutPageData',
})

if (error.value) {
  // eslint-disable-next-line no-console
  console.error(error.value)
}
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