<template>
  <NuxtLayout>
    <div>
      <HeroSection
        title="Impressum"
        subtitle="Rechtliche Informationen und Angaben gemäß § 5 TMG"
        background-image="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg"
        height="400"
        :show-button="false"
      />
      
      <VContainer class="py-12">
        <VRow justify="center">
          <VCol cols="12" md="8" lg="6">
            <VCard class="pa-8" elevation="2">
              <VCardTitle class="text-h4 font-weight-bold mb-6 text-center">
                Impressum
              </VCardTitle>
              
              <VCardText>
                <div class="legal-section mb-8">
                  <h2 class="text-h5 font-weight-bold mb-4 text-primary">
                    Angaben gemäß § 5 TMG
                  </h2>
                  
                  <div class="mb-6">
                    <h3 class="text-h6 font-weight-bold mb-2">Vereinsname:</h3>
                    <p class="text-body-1 mb-0">
                      Schützenverein Tradition e.V.<br>
                      Gegründet 1832
                    </p>
                  </div>
                  
                  <div class="mb-6">
                    <h3 class="text-h6 font-weight-bold mb-2">Anschrift:</h3>
                    <p class="text-body-1 mb-0">
                      Schützenstraße 123<br>
                      12345 Musterstadt<br>
                      Deutschland
                    </p>
                  </div>
                  
                  <div class="mb-6">
                    <h3 class="text-h6 font-weight-bold mb-2">Kontakt:</h3>
                    <p class="text-body-1 mb-2">
                      <VIcon icon="mdi-phone" size="small" class="mr-2" />
                      Telefon: +49 (0) 123 456789
                    </p>
                    <p class="text-body-1 mb-2">
                      <VIcon icon="mdi-fax" size="small" class="mr-2" />
                      Fax: +49 (0) 123 456790
                    </p>
                    <p class="text-body-1 mb-0">
                      <VIcon icon="mdi-email" size="small" class="mr-2" />
                      E-Mail: info@schuetzenverein-tradition.de
                    </p>
                  </div>
                </div>
                
                <VDivider class="my-8" />
                
                <div class="legal-section mb-8">
                  <h2 class="text-h5 font-weight-bold mb-4 text-primary">
                    Vereinsregister
                  </h2>
                  
                  <div class="mb-4">
                    <p class="text-body-1 mb-2">
                      <strong>Registergericht:</strong> Amtsgericht Musterstadt
                    </p>
                    <p class="text-body-1 mb-2">
                      <strong>Registernummer:</strong> VR 12345
                    </p>
                    <p class="text-body-1 mb-0">
                      <strong>Vereinsregister-ID:</strong> DE123456789
                    </p>
                  </div>
                </div>
                
                <VDivider class="my-8" />
                
                <div class="legal-section mb-8">
                  <h2 class="text-h5 font-weight-bold mb-4 text-primary">
                    Vertretungsberechtigter Vorstand
                  </h2>
                  
                  <div class="mb-4">
                    <p class="text-body-1 mb-2">
                      <strong>1. Vorsitzender:</strong> Franz Weber
                    </p>
                    <p class="text-body-1 mb-2">
                      <strong>2. Vorsitzende:</strong> Martina Schulz
                    </p>
                    <p class="text-body-1 mb-0">
                      <strong>Kassenwart:</strong> Thomas Müller
                    </p>
                  </div>
                  
                  <VAlert type="info" variant="tonal" class="mt-4">
                    <VIcon icon="mdi-information" class="mr-2" />
                    Der Verein wird gerichtlich und außergerichtlich durch den 1. Vorsitzenden vertreten. 
                    Bei dessen Verhinderung durch die 2. Vorsitzende.
                  </VAlert>
                </div>
                
                <VDivider class="my-8" />
                
                <div class="legal-section mb-8">
                  <h2 class="text-h5 font-weight-bold mb-4 text-primary">
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                  </h2>
                  
                  <div class="mb-4">
                    <p class="text-body-1 mb-0">
                      Franz Weber<br>
                      Schützenstraße 123<br>
                      12345 Musterstadt
                    </p>
                  </div>
                </div>
                
                <VDivider class="my-8" />
                
                <div class="legal-section mb-8">
                  <h2 class="text-h5 font-weight-bold mb-4 text-primary">
                    Haftungsausschluss
                  </h2>
                  
                  <div class="mb-6">
                    <h3 class="text-h6 font-weight-bold mb-2">Haftung für Inhalte</h3>
                    <p class="text-body-2 mb-4">
                      Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                      nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                      Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte 
                      fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine 
                      rechtswidrige Tätigkeit hinweisen.
                    </p>
                    <p class="text-body-2">
                      Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
                      allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
                      erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei 
                      Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                    </p>
                  </div>
                  
                  <div class="mb-6">
                    <h3 class="text-h6 font-weight-bold mb-2">Haftung für Links</h3>
                    <p class="text-body-2">
                      Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                      Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                      Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                      Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf 
                      mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der 
                      Verlinkung nicht erkennbar.
                    </p>
                  </div>
                  
                  <div class="mb-6">
                    <h3 class="text-h6 font-weight-bold mb-2">Urheberrecht</h3>
                    <p class="text-body-2">
                      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                      dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                      der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                      Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind 
                      nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                    </p>
                  </div>
                </div>
                
                <VDivider class="my-8" />
                
                <div class="legal-section mb-8">
                  <h2 class="text-h5 font-weight-bold mb-4 text-primary">
                    Streitschlichtung
                  </h2>
                  
                  <p class="text-body-2 mb-4">
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" class="text-primary">
                      https://ec.europa.eu/consumers/odr/
                    </a>
                  </p>
                  
                  <p class="text-body-2">
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                    Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </div>
                
                <VDivider class="my-8" />
                
                <div class="legal-section">
                  <h2 class="text-h5 font-weight-bold mb-4 text-primary">
                    Bildnachweise
                  </h2>
                  
                  <p class="text-body-2 mb-4">
                    Die auf dieser Website verwendeten Bilder stammen aus folgenden Quellen:
                  </p>
                  
                  <ul class="text-body-2 mb-4">
                    <li class="mb-2">Vereinseigene Fotografien</li>
                    <li class="mb-2">Pexels.com (lizenzfreie Bilder)</li>
                    <li class="mb-2">Unsplash.com (lizenzfreie Bilder)</li>
                  </ul>
                  
                  <p class="text-body-2">
                    Alle verwendeten Bilder unterliegen den jeweiligen Lizenzbedingungen und werden 
                    ausschließlich im Rahmen der gewährten Nutzungsrechte verwendet.
                  </p>
                </div>
                
                <VAlert type="success" variant="tonal" class="mt-8">
                  <VIcon icon="mdi-calendar-clock" class="mr-2" />
                  <strong>Stand:</strong> {{ currentDate }}
                </VAlert>
              </VCardText>
            </VCard>
            
            <div class="text-center mt-8">
              <VBtn
                color="primary"
                variant="outlined"
                to="/contact"
                size="large"
              >
                <VIcon icon="mdi-email" class="mr-2" />
                Bei Fragen kontaktieren Sie uns
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { computed } from 'vue';

// SEO Meta Tags
useHead({
  title: 'Impressum - Schützenverein Tradition',
  meta: [
    {
      name: 'description',
      content: 'Impressum und rechtliche Informationen des Schützenverein Tradition e.V. - Angaben gemäß § 5 TMG'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
});

// Current date for the imprint
const currentDate = computed(() => {
  return new Date().toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});
</script>

<style scoped>
.legal-section {
  line-height: 1.7;
}

.legal-section h2 {
  border-bottom: 2px solid var(--v-primary-base);
  padding-bottom: 8px;
}

.legal-section h3 {
  color: var(--v-primary-base);
}

.legal-section p {
  text-align: justify;
}

.legal-section ul {
  padding-left: 20px;
}

.legal-section li {
  margin-bottom: 4px;
}

a {
  text-decoration: none;
  color: var(--v-primary-base);
}

a:hover {
  text-decoration: underline;
}

/* Print styles */
@media print {
  .v-btn {
    display: none !important;
  }
  
  .legal-section {
    break-inside: avoid;
  }
}
</style>