<template>
  <div class="image-gallery">
    <Swiper
      :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
      :slides-per-view="1"
      :space-between="24"
      :breakpoints="{
        '640': {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        '1024': {
          slidesPerView: 3,
          spaceBetween: 24,
        }
      }"
      :pagination="{ clickable: true }"
      :navigation="true"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index">
        <div class="pa-2">
          <VCard class="gallery-card overflow-hidden" @click="openLightbox(index)">
            <VImg :src="image.src" :alt="image.title" height="250" cover class="gallery-image" />
            <VCardTitle class="text-body-1">{{ image.title }}</VCardTitle>
          </VCard>
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- Lightbox -->
    <VDialog v-model="lightboxOpen" fullscreen>
      <VCard>
        <VToolbar color="primary" dark>
          <VBtn icon @click="lightboxOpen = false">
            <VIcon>mdi-close</VIcon>
          </VBtn>
          <VToolbarTitle>{{ currentImage ? currentImage.title : '' }}</VToolbarTitle>
          <VSpacer></VSpacer>
          <VBtn icon @click="prevImage">
            <VIcon>mdi-chevron-left</VIcon>
          </VBtn>
          <VBtn icon @click="nextImage">
            <VIcon>mdi-chevron-right</VIcon>
          </VBtn>
        </VToolbar>
        <VCardText class="d-flex align-center justify-center bg-black" style="height: calc(100vh - 64px)">
          <VImg 
            v-if="currentImage" 
            :src="currentImage.src" 
            :alt="currentImage.title" 
            contain
            max-height="90vh"
          />
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules';

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
});

const lightboxOpen = ref(false);
const currentIndex = ref(0);

const currentImage = computed(() => {
  return props.images[currentIndex.value];
});

const openLightbox = (index) => {
  currentIndex.value = index;
  lightboxOpen.value = true;
};

const nextImage = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = props.images.length - 1;
  }
};
</script>

<style scoped>
.gallery-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.gallery-card:hover {
  box-shadow: 0 8px 20px rgba(74, 103, 65, 0.12) !important;
  background: linear-gradient(135deg, #fff 0%, #F5F5F0 100%) !important;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: var(--v-primary-base) !important;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: var(--v-primary-base) !important;
}
</style>