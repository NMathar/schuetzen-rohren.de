<template>
  <div class="text-center mb-12">
    <h2 class="text-h3 font-weight-bold mb-2">{{ title }}</h2>
    <div class="d-flex justify-center">
      <div class="title-line"></div>
    </div>
    <p v-if="subtitle" class="text-subtitle-1 mt-4 max-width-700 mx-auto">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.title-line {
  width: 80px;
  height: 3px;
  background-color: #6D213C;
  margin-top: 16px;
}

.max-width-700 {
  max-width: 700px;
}
</style>