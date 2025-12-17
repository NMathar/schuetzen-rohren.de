<template>
  <div>
    <VAppBar
      color="transparent"
      :elevation="scrolled ? 2 : 0"
      :class="{ 'bg-white': scrolled, 'transparent-nav': !scrolled }"
      app
      height="80"
    >
      <div class="container d-flex align-center py-2">
        <div class="d-flex align-center">
          <NuxtLink to="/" class="text-decoration-none">
            <div class="d-flex align-center">
              <img
                src="~/assets/images/logo.jpeg"
                alt="Schützenverein Logo"
                height="50"
                class="mr-3"
              />
              <div>
                <h1 class="text-h5 font-weight-bold mb-0" :class="scrolled ? 'text-primary' : 'text-white'">
                  Schützenverein
                </h1>
                <div class="text-caption text-uppercase" :class="scrolled ? 'text-accent' : 'text-white'">
                  Tradition seit 1832
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <VSpacer />

        <!-- Desktop Navigation -->
        <div class="d-none d-md-flex">
          <VBtn
            v-for="(item, i) in menuItems"
            :key="i"
            :to="item.to"
            variant="text"
            class="mx-2"
            :color="scrolled ? 'primary' : 'white'"
          >
            {{ item.title }}
          </VBtn>
        </div>

        <!-- Mobile Navigation Button -->
        <div class="d-flex d-md-none">
          <VBtn icon @click="drawer = !drawer" variant="text" :color="scrolled ? 'primary' : 'white'">
            <VIcon>mdi-menu</VIcon>
          </VBtn>
        </div>
      </div>
    </VAppBar>

    <!-- Mobile Navigation Drawer -->
    <VNavigationDrawer v-model="drawer" temporary right width="280">
      <div class="pa-4">
        <h2 class="text-h6 font-weight-bold mb-4 primary--text">Menü</h2>
        <VList nav density="compact">
          <VListItem
            v-for="(item, i) in menuItems"
            :key="i"
            :to="item.to"
            :title="item.title"
            class="mb-2"
            color="primary"
            rounded="lg"
          />
        </VList>
      </div>
    </VNavigationDrawer>
  </div>
</template>

<script setup>
const drawer = ref(false);
const scrolled = ref(false);

const menuItems = [
  { title: 'Startseite', to: '/' },
  { title: 'Über uns', to: '/about' },
  { title: 'Räumlichkeiten', to: '/facilities' },
  { title: 'Veranstaltungen', to: '/events' },
  { title: 'Galerie', to: '/gallery' },
  { title: 'Kontakt', to: '/contact' },
];

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // Initial check
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  // Get the hero section height dynamically
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    // If there's a hero section, use its full height
    const heroHeight = heroSection.offsetHeight;
    const scrollThreshold = Math.max(heroHeight - 50, 100); // Transform near the end of hero section
    scrolled.value = window.scrollY > scrollThreshold;
  } else {
    // If no hero section (shouldn't happen), use a small threshold
    scrolled.value = window.scrollY > 100;
  }
};
</script>

<style scoped>
.v-app-bar {
  transition: all 0.3s ease;
}

.transparent-nav {
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), transparent);
}

.bg-white {
  background-color: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
}
</style>