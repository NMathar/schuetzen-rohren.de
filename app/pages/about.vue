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
            
            <VTimeline align="start" class="mt-12 mb-8">
              <VTimelineItem
                v-for="(milestone, index) in aboutPageDate.entry.meilensteine"
                :key="milestone.jahr"
                :dot-color="index % 2 === 0 ? 'primary' : 'accent'"
                size="small"
              >
                <template #opposite>
                  <div class="headline font-weight-bold" :class="index % 2 === 0 ? 'text-primary' : 'text-accent'" v-text="milestone.jahr">
                  </div>
                </template>
                <div>
                  <div class="text-h5 font-weight-light mb-1" :class="index % 2 === 0 ? 'text-primary' : 'text-accent'">
                    {{ milestone.title }}
                  </div>
                  <div v-html="milestone.beschreibung"></div>
                </div>
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

</style>