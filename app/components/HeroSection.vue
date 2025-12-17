<template>
  <div class="hero-section position-relative">
    <VImg
      :src="backgroundImage"
      :height="height"
      gradient="to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)"
      cover
    >
      <div class="d-flex flex-column justify-center align-center text-center h-100 px-4">
        <h1 
          class="text-white font-weight-bold mb-3"
          :class="isHomePage ? 'text-h2 text-md-h1' : 'text-h4 text-md-h3'"
        >
          {{ title }}
        </h1>
        <p class="text-white text-h6 font-weight-regular mb-8 max-width-md">
          {{ subtitle }}
        </p>
        <div v-if="showButton">
          <VBtn
            size="large"
            color="accent"
            variant="elevated"
            :to="buttonLink"
            class="text-uppercase"
          >
            {{ buttonText }}
          </VBtn>
        </div>
      </div>
    </VImg>
  </div>
</template>

<script setup>
const route = useRoute();

const isHomePage = computed(() => {
  return route.path === '/' || route.path === '';
});

defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  backgroundImage: {
    type: String,
    required: true
  },
  height: {
    type: [String, Number],
    default: 600
  },
  showButton: {
    type: Boolean,
    default: true
  },
  buttonText: {
    type: String,
    default: 'Mehr erfahren'
  },
  buttonLink: {
    type: String,
    default: '/about'
  }
});
</script>

<style scoped>
.max-width-md {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
</style>