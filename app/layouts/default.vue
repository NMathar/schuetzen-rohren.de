<template>
  <VApp>
    <AppHeader />
    <VMain class="min-vh-100 position-relative">
      <div class="oak-leaf-corner top-left"></div>
      <div class="oak-leaf-corner top-right"></div>
      <div class="oak-leaf-corner bottom-left"></div>
      <div class="oak-leaf-corner bottom-right"></div>
      <slot />
    </VMain>
    <AppFooter />
  </VApp>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('section, .v-card, .v-img').forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
});
</script>

<style>
.min-vh-100 {
  min-height: 100vh;
}

.position-relative {
  position: relative;
}
</style>