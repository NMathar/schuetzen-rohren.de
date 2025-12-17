<template>
  <NuxtLayout>
    <div>
      <HeroSection
        title="Galerie"
        subtitle="Impressionen aus unserem Vereinsleben und unseren Veranstaltungen"
        background-image="https://images.pexels.com/photos/1125268/pexels-photo-1125268.jpeg"
        height="400"
      />
      
      <VContainer class="py-12">
        <VRow justify="center">
          <VCol cols="12" md="10">
            <!-- Filter Section -->
            <div class="mb-8">
              <VTextField
                v-model="searchQuery"
                label="Bilder durchsuchen"
                variant="outlined"
                prepend-inner-icon="mdi-magnify"
                clearable
                class="mb-4"
              />
              
              <div class="d-flex flex-wrap gap-2 mb-6">
                <VChip
                  v-for="category in categories"
                  :key="category.value"
                  :color="selectedCategory === category.value ? 'primary' : undefined"
                  :variant="selectedCategory === category.value ? 'elevated' : 'outlined'"
                  @click="selectCategory(category.value)"
                  class="mr-2 mb-2"
                >
                  {{ category.label }}
                </VChip>
              </div>
            </div>
            
            <!-- Masonry Gallery -->
            <div class="masonry-container" ref="masonryContainer">
              <div
                v-for="(image, index) in displayedImages"
                :key="`${image.id}-${index}`"
                class="masonry-item"
                :style="{ height: `${image.height}px` }"
                @click="openLightbox(index)"
              >
                <VCard class="gallery-card h-100" elevation="2">
                  <VImg
                    :src="image.src"
                    :alt="image.title"
                    :height="image.height - 80"
                    cover
                    class="gallery-image"
                  />
                  <VCardTitle class="text-body-1 pa-3">
                    {{ image.title }}
                  </VCardTitle>
                </VCard>
              </div>
            </div>
            
            <!-- Loading Indicator -->
            <div v-if="loading" class="text-center py-8">
              <VProgressCircular indeterminate color="primary" size="64" />
              <p class="text-subtitle-1 mt-4">Weitere Bilder werden geladen...</p>
            </div>
            
            <!-- End of Gallery Message -->
            <div v-if="!hasMore && displayedImages.length > 0" class="text-center py-8">
              <VIcon icon="mdi-check-circle" size="48" color="success" class="mb-4" />
              <p class="text-subtitle-1">Alle Bilder wurden geladen</p>
            </div>
          </VCol>
        </VRow>
      </VContainer>
      
      <!-- Lightbox -->
      <VDialog v-model="lightboxOpen" fullscreen>
        <VCard>
          <VToolbar color="primary" dark>
            <VBtn icon @click="lightboxOpen = false">
              <VIcon>mdi-close</VIcon>
            </VBtn>
            <VToolbarTitle>{{ currentImage ? currentImage.title : '' }}</VToolbarTitle>
            <VSpacer />
            <VBtn icon @click="prevImage" :disabled="currentIndex === 0">
              <VIcon>mdi-chevron-left</VIcon>
            </VBtn>
            <span class="mx-4">{{ currentIndex + 1 }} / {{ displayedImages.length }}</span>
            <VBtn icon @click="nextImage" :disabled="currentIndex === displayedImages.length - 1">
              <VIcon>mdi-chevron-right</VIcon>
            </VBtn>
          </VToolbar>
          <VCardText class="d-flex align-center justify-center bg-black pa-0" style="height: calc(100vh - 64px)">
            <VImg 
              v-if="currentImage" 
              :src="currentImage.src" 
              :alt="currentImage.title" 
              contain
              max-height="100%"
              max-width="100%"
            />
          </VCardText>
        </VCard>
      </VDialog>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

// Reactive data
const searchQuery = ref('');
const selectedCategory = ref('all');
const loading = ref(false);
const hasMore = ref(true);
const currentPage = ref(1);
const lightboxOpen = ref(false);
const currentIndex = ref(0);
const masonryContainer = ref(null);

// Gallery data
const allImages = ref([]);
const displayedImages = ref([]);

// Categories
const categories = [
  { label: 'Alle', value: 'all' },
  { label: 'Veranstaltungen', value: 'events' },
  { label: 'Training', value: 'training' },
  { label: 'Vereinsleben', value: 'club' },
  { label: 'Schießstände', value: 'ranges' },
  { label: 'Räumlichkeiten', value: 'facilities' }
];

// Computed
const currentImage = computed(() => {
  return displayedImages.value[currentIndex.value];
});

const filteredImages = computed(() => {
  let filtered = allImages.value;
  
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(img => img.category === selectedCategory.value);
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(img => 
      img.title.toLowerCase().includes(query) ||
      img.description.toLowerCase().includes(query)
    );
  }
  
  return filtered;
});

// Methods
const generateMockImages = () => {
  const mockImages = [];
  const categories = ['events', 'training', 'club', 'ranges', 'facilities'];
  const imageUrls = [
    'https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg',
    'https://images.pexels.com/photos/1125268/pexels-photo-1125268.jpeg',
    'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg',
    'https://images.pexels.com/photos/3933029/pexels-photo-3933029.jpeg',
    'https://images.pexels.com/photos/2079265/pexels-photo-2079265.jpeg',
    'https://images.pexels.com/photos/7138753/pexels-photo-7138753.jpeg',
    'https://images.pexels.com/photos/4456987/pexels-photo-4456987.jpeg',
    'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
    'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg',
    'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg',
    'https://images.pexels.com/photos/2604792/pexels-photo-2604792.jpeg',
    'https://images.pexels.com/photos/7545322/pexels-photo-7545322.jpeg',
    'https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg',
    'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg',
    'https://images.pexels.com/photos/3050651/pexels-photo-3050651.jpeg',
    'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
    'https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg',
    'https://images.pexels.com/photos/279648/pexels-photo-279648.jpeg',
    'https://images.pexels.com/photos/6899434/pexels-photo-6899434.jpeg',
    'https://images.pexels.com/photos/2079445/pexels-photo-2079445.jpeg',
    'https://images.pexels.com/photos/3220286/pexels-photo-3220286.jpeg',
    'https://images.pexels.com/photos/773202/pexels-photo-773202.jpeg',
    'https://images.pexels.com/photos/7214835/pexels-photo-7214835.jpeg',
    'https://images.pexels.com/photos/133919/pexels-photo-133919.jpeg',
    'https://images.pexels.com/photos/937493/pexels-photo-937493.jpeg'
  ];
  
  for (let i = 1; i <= 100; i++) {
    const randomHeight = Math.floor(Math.random() * 200) + 250; // 250-450px height
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    
    mockImages.push({
      id: i,
      src: randomImageUrl,
      title: `Vereinsbild ${i}`,
      description: `Beschreibung für Bild ${i}`,
      category: randomCategory,
      height: randomHeight
    });
  }
  
  return mockImages;
};

const loadMoreImages = async () => {
  if (loading.value || !hasMore.value) return;
  
  loading.value = true;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const startIndex = (currentPage.value - 1) * 12;
  const endIndex = startIndex + 12;
  const newImages = filteredImages.value.slice(startIndex, endIndex);
  
  if (newImages.length === 0) {
    hasMore.value = false;
  } else {
    displayedImages.value.push(...newImages);
    currentPage.value++;
    
    if (displayedImages.value.length >= filteredImages.value.length) {
      hasMore.value = false;
    }
  }
  
  loading.value = false;
  
  // Trigger masonry layout update
  await nextTick();
  updateMasonryLayout();
};

const updateMasonryLayout = () => {
  if (!masonryContainer.value) return;
  
  const container = masonryContainer.value;
  const items = container.querySelectorAll('.masonry-item');
  const containerWidth = container.offsetWidth;
  const columnWidth = Math.floor(containerWidth / Math.floor(containerWidth / 300)); // Minimum 300px per column
  const columnCount = Math.floor(containerWidth / columnWidth);
  const columnHeights = new Array(columnCount).fill(0);
  
  items.forEach((item, index) => {
    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    const x = shortestColumnIndex * columnWidth;
    const y = columnHeights[shortestColumnIndex];
    
    item.style.position = 'absolute';
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.width = `${columnWidth - 16}px`; // 16px gap
    
    columnHeights[shortestColumnIndex] += item.offsetHeight + 16; // 16px gap
  });
  
  // Set container height
  container.style.height = `${Math.max(...columnHeights)}px`;
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  resetGallery();
};

const resetGallery = () => {
  displayedImages.value = [];
  currentPage.value = 1;
  hasMore.value = true;
  loadMoreImages();
};

const openLightbox = (index) => {
  currentIndex.value = index;
  lightboxOpen.value = true;
};

const nextImage = () => {
  if (currentIndex.value < displayedImages.value.length - 1) {
    currentIndex.value++;
  }
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  if (scrollTop + windowHeight >= documentHeight - 1000) { // Load when 1000px from bottom
    loadMoreImages();
  }
};

const handleResize = () => {
  updateMasonryLayout();
};

// Watchers
watch([searchQuery, selectedCategory], () => {
  resetGallery();
}, { debounce: 300 });

// Lifecycle
onMounted(() => {
  allImages.value = generateMockImages();
  loadMoreImages();
  
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});

// Keyboard navigation for lightbox
onMounted(() => {
  const handleKeydown = (e) => {
    if (!lightboxOpen.value) return;
    
    if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'Escape') {
      lightboxOpen.value = false;
    }
  };
  
  window.addEventListener('keydown', handleKeydown);
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
});
</script>

<style scoped>
.masonry-container {
  position: relative;
  width: 100%;
  min-height: 400px;
}

.masonry-item {
  transition: all 0.3s ease;
  cursor: pointer;
}

.gallery-card {
  transition: all 0.3s ease;
  border-radius: 12px !important;
  overflow: hidden;
}

.gallery-card:hover {
  box-shadow: 0 8px 20px rgba(74, 103, 65, 0.12) !important;
  background: linear-gradient(135deg, #fff 0%, #F5F5F0 100%) !important;
}

.gallery-image {
  transition: all 0.3s ease;
}

.gallery-image:hover {
  filter: brightness(1.05);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .masonry-container {
    padding: 0 8px;
  }
}

/* Smooth loading animation */
.masonry-item {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger animation for items */
.masonry-item:nth-child(1) { animation-delay: 0.1s; }
.masonry-item:nth-child(2) { animation-delay: 0.2s; }
.masonry-item:nth-child(3) { animation-delay: 0.3s; }
.masonry-item:nth-child(4) { animation-delay: 0.4s; }
.masonry-item:nth-child(5) { animation-delay: 0.5s; }
.masonry-item:nth-child(6) { animation-delay: 0.6s; }
</style>