<template>
  <VFooter class="bg-primary py-8">
    <VContainer>
      <VRow>
        <VCol cols="12" md="4">
          <div class="d-flex align-center mb-4">
            <img
              src="~assets//images/logo.jpeg"
              alt="Schützenverein Logo"
              height="60"
              class="mr-3"
            />
            <div>
              <h3 class="text-h5 font-weight-bold text-accent mb-0">
                Schützenverein
              </h3>
              <div class="text-caption text-uppercase white--text">
                Tradition seit 1832
              </div>
            </div>
          </div>
          <p class="white--text text-body-2 mb-0">
            Der Schützenverein steht für Tradition, Präzision und Gemeinschaft.
            Wir pflegen altes Handwerk und sportliche Exzellenz.
          </p>
        </VCol>

        <VCol cols="12" md="4">
          <h4 class="text-h6 font-weight-bold text-accent mb-4">Kontakt</h4>
          <div class="d-flex align-center mb-3">
            <VIcon color="white" class="mr-2">mdi-map-marker</VIcon>
            <p class="white--text text-body-2 mb-0">
              Schützenstraße 123, 12345 Musterstadt
            </p>
          </div>
          <div class="d-flex align-center mb-3">
            <VIcon color="white" class="mr-2">mdi-phone</VIcon>
            <p class="white--text text-body-2 mb-0">+49 (0) 123 456789</p>
          </div>
          <div class="d-flex align-center mb-3">
            <VIcon color="white" class="mr-2">mdi-email</VIcon>
            <p class="white--text text-body-2 mb-0">
              info@schuetzenverein-tradition.de
            </p>
          </div>
        </VCol>

        <VCol cols="12" md="4">
          <h4 class="text-h6 font-weight-bold text-accent mb-4">
            Öffnungszeiten
          </h4>
          <div class="d-flex justify-space-between mb-2">
            <p class="white--text text-body-2 mb-0">Montag - Freitag:</p>
            <p class="white--text text-body-2 mb-0">16:00 - 22:00 Uhr</p>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <p class="white--text text-body-2 mb-0">Samstag:</p>
            <p class="white--text text-body-2 mb-0">14:00 - 22:00 Uhr</p>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <p class="white--text text-body-2 mb-0">Sonntag:</p>
            <p class="white--text text-body-2 mb-0">10:00 - 18:00 Uhr</p>
          </div>
          <div class="d-flex mt-4">
            <VBtn icon variant="text" class="mr-2" color="white">
              <VIcon>mdi-facebook</VIcon>
            </VBtn>
            <VBtn icon variant="text" class="mr-2" color="white">
              <VIcon>mdi-instagram</VIcon>
            </VBtn>
            <VBtn icon variant="text" color="white">
              <VIcon>mdi-youtube</VIcon>
            </VBtn>
          </div>
        </VCol>
      </VRow>

      <VDivider class="my-6 bg-white" />

      <div
        class="d-flex flex-column flex-md-row justify-space-between align-center"
      >
        <p
          class="white--text text-body-2 text-center text-md-left mb-3 mb-md-0"
        >
          © {{ new Date().getFullYear() }} Schützenverein Tradition. Alle Rechte
          vorbehalten.
        </p>
        <div class="d-flex">
          <VBtn
            v-for="(item, i) in footerLinks"
            :key="i"
            :to="item.to"
            variant="text"
            size="small"
            class="mx-1"
            color="white"
          >
            {{ item.title }}
          </VBtn>
        </div>
      </div>
    </VContainer>
  </VFooter>
</template>

<script setup>
const footerLinks = [
  { title: 'Impressum', to: '/imprint' },
  // { title: 'Datenschutz', to: '/privacy' },
  // { title: 'Satzung', to: '/statutes' },
];
</script>