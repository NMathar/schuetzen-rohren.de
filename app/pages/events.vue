<template>
  <NuxtLayout>
    <div>
      <HeroSection
        title="Veranstaltungen"
        subtitle="Aktuelle Termine und Events in unserem Schützenverein"
        background-image="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg"
        height="400"
      />
      
      <VContainer class="py-12">
        <VRow justify="center">
          <VCol cols="12" md="10" lg="8">
            <VTabs
              v-model="activeTab"
              bg-color="background"
              grow
              class="mb-8"
            >
              <VTab value="upcoming">Kommende Veranstaltungen</VTab>
              <VTab value="calendar">Jahreskalender</VTab>
            </VTabs>
            
            <VWindow v-model="activeTab">
              <VWindowItem value="upcoming">
                <div class="mb-8">
                  <VTextField
                    v-model="search"
                    label="Veranstaltungen durchsuchen"
                    variant="outlined"
                    prepend-inner-icon="mdi-magnify"
                    clearable
                    class="mb-6"
                  ></VTextField>
                  
                  <div class="d-flex flex-wrap gap-2 mb-6">
                    <VChip
                      v-for="(category, index) in eventCategories"
                      :key="index"
                      :color="selectedCategories.includes(category.value) ? category.color : undefined"
                      :variant="selectedCategories.includes(category.value) ? 'elevated' : 'outlined'"
                      @click="toggleCategory(category.value)"
                      class="mr-2 mb-2"
                    >
                      {{ category.label }}
                    </VChip>
                  </div>
                  
                  <div v-if="filteredEvents.length === 0" class="text-center py-8">
                    <VIcon icon="mdi-calendar-remove" size="64" color="grey-lighten-1" class="mb-4" />
                    <p class="text-subtitle-1">Keine Veranstaltungen gefunden</p>
                    <p class="text-body-2">Versuchen Sie andere Filterkriterien oder schauen Sie später wieder vorbei.</p>
                  </div>
                  
                  <VTimeline align="start" density="default" v-else>
                    <VTimelineItem
                      v-for="event in filteredEvents" 
                      :key="event.id"
                      :dot-color="getCategoryColor(event.category)"
                      size="small"
                    >
                      <template v-slot:opposite>
                        <div class="text-subtitle-2 font-weight-bold">{{ event.date }}</div>
                        <div class="text-caption">{{ event.time }}</div>
                      </template>
                      <VCard class="elevation-2 mb-4 event-card" :class="event.highlighted ? 'highlighted-event' : ''">
                        <VCardTitle class="text-subtitle-1 font-weight-bold pb-1">
                          {{ event.title }}
                          <VChip
                            v-if="event.highlighted"
                            color="accent"
                            size="small"
                            class="ml-2"
                          >
                            Highlight
                          </VChip>
                        </VCardTitle>
                        <VCardText>
                          <p class="text-body-2 mb-2">{{ event.description }}</p>
                          
                          <div class="d-flex align-center mb-2">
                            <VIcon size="small" color="primary" class="mr-2">mdi-map-marker</VIcon>
                            <span class="text-caption">{{ event.location }}</span>
                          </div>
                          
                          <div class="d-flex align-center mb-2">
                            <VIcon size="small" color="primary" class="mr-2">mdi-account-group</VIcon>
                            <span class="text-caption">{{ event.audience }}</span>
                          </div>
                          
                          <div v-if="event.registration" class="d-flex align-center">
                            <VIcon size="small" color="warning" class="mr-2">mdi-information</VIcon>
                            <span class="text-caption">{{ event.registration }}</span>
                          </div>
                        </VCardText>
                        <VCardActions>
                          <VSpacer />
                          <VBtn
                            v-if="event.registerLink"
                            color="primary"
                            variant="tonal"
                            size="small"
                            :to="event.registerLink"
                          >
                            Anmelden
                          </VBtn>
                          <VBtn
                            color="primary"
                            size="small"
                            :to="`/events/${event.id}`"
                          >
                            Details
                          </VBtn>
                        </VCardActions>
                      </VCard>
                    </VTimelineItem>
                  </VTimeline>
                </div>
              </VWindowItem>
              
              <VWindowItem value="calendar">
                <VRow justify="center">
                  <VCol cols="12" md="10">
                    <VCard>
                      <VCardTitle class="text-h5">Schützenverein Jahreskalender 2025</VCardTitle>
                      <VCardText>
                        <VTable class="calendar-table">
                          <thead>
                            <tr>
                              <th>Monat</th>
                              <th>Termin</th>
                              <th>Veranstaltung</th>
                              <th>Kategorie</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="event in annualEvents" :key="event.date" :class="{ 'highlighted-row': event.highlighted }">
                              <td>{{ event.month }}</td>
                              <td>{{ event.date }}</td>
                              <td>
                                <div class="font-weight-bold">{{ event.title }}</div>
                                <div class="text-caption">{{ event.location }}</div>
                              </td>
                              <td>
                                <VChip
                                  :color="getCategoryColor(event.category)"
                                  size="small"
                                >
                                  {{ getCategoryLabel(event.category) }}
                                </VChip>
                              </td>
                            </tr>
                          </tbody>
                        </VTable>
                      </VCardText>
                    </VCard>
                  </VCol>
                </VRow>
              </VWindowItem>
            </VWindow>
            
            <VDivider class="my-12" />
            
            <SectionTitle
              title="Vergangene Highlights"
              subtitle="Impressionen von unseren letzten Veranstaltungen"
            />
            
            <VRow>
              <VCol v-for="highlight in pastHighlights" :key="highlight.title" cols="12" md="6" class="mb-4">
                <VCard class="highlight-card">
                  <VImg :src="highlight.image" height="250" cover />
                  <VCardTitle class="text-h6">{{ highlight.title }}</VCardTitle>
                  <VCardSubtitle>{{ highlight.date }}</VCardSubtitle>
                  <VCardText>
                    <p>{{ highlight.description }}</p>
                  </VCardText>
                  <VCardActions>
                    <VSpacer />
                    <VBtn color="primary" variant="text">
                      Galerie ansehen
                    </VBtn>
                  </VCardActions>
                </VCard>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VContainer>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const activeTab = ref('upcoming');
const search = ref('');
const selectedCategories = ref([]);

// Event categories
const eventCategories = [
  { label: 'Wettbewerbe', value: 'competition', color: 'primary' },
  { label: 'Training', value: 'training', color: 'secondary' },
  { label: 'Vereinsleben', value: 'club', color: 'tertiary' },
  { label: 'Feste', value: 'celebration', color: 'accent' },
  { label: 'Öffentlich', value: 'public', color: 'success' }
];

const upcomingEvents = ref([]);
const annualEvents = ref([]);
const pastHighlights = ref([]);

onMounted(async () => {
  const eventsData = await queryContent('data/events').findOne();
  upcomingEvents.value = eventsData.upcomingEvents;
  annualEvents.value = eventsData.annualEvents;
  pastHighlights.value = eventsData.pastHighlights;
});

// Filter events based on search and selected categories
const filteredEvents = computed(() => {
  let filtered = upcomingEvents.value;
  
  if (search.value) {
    const searchLower = search.value.toLowerCase();
    filtered = filtered.filter(event => 
      event.title.toLowerCase().includes(searchLower) || 
      event.description.toLowerCase().includes(searchLower) ||
      event.location.toLowerCase().includes(searchLower)
    );
  }
  
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(event => 
      selectedCategories.value.includes(event.category)
    );
  }
  
  return filtered;
});

// Toggle category selection
const toggleCategory = (category) => {
  const index = selectedCategories.value.indexOf(category);
  if (index === -1) {
    selectedCategories.value.push(category);
  } else {
    selectedCategories.value.splice(index, 1);
  }
};

// Get category color
const getCategoryColor = (categoryValue) => {
  const category = eventCategories.find(cat => cat.value === categoryValue);
  return category ? category.color : 'grey';
};

// Get category label
const getCategoryLabel = (categoryValue) => {
  const category = eventCategories.find(cat => cat.value === categoryValue);
  return category ? category.label : categoryValue;
};
</script>

<style scoped>
.calendar-table {
  width: 100%;
  border-collapse: collapse;
}

.calendar-table th,
.calendar-table td {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.highlighted-event {
  border-left: 4px solid var(--v-accent-base) !important;
}

.highlighted-row {
  background-color: rgba(109, 33, 60, 0.05);
}

.event-card {
  transition: all 0.3s ease;
}

.event-card:hover {
  box-shadow: 0 8px 20px rgba(74, 103, 65, 0.12) !important;
  background: linear-gradient(135deg, #fff 0%, #F5F5F0 100%) !important;
}

.highlight-card {
  transition: all 0.3s ease;
}

.highlight-card:hover {
  box-shadow: 0 8px 20px rgba(74, 103, 65, 0.12) !important;
  background: linear-gradient(135deg, #fff 0%, #F5F5F0 100%) !important;
}
</style>