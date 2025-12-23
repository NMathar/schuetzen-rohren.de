<template>
  <NuxtLayout>
    <div>
      <HeroSection
        title="Kontakt"
        subtitle="Sprechen Sie uns an - wir freuen uns auf Ihre Nachricht"
        background-image="https://images.pexels.com/photos/5605061/pexels-photo-5605061.jpeg"
        height="400"
        button-text="Mehr über uns"
      />
      
      <VContainer class="py-12">
        <VRow justify="center">
          <VCol cols="12" md="10" lg="8">
            <VCard class="mb-12">
              <VRow>
                <VCol cols="12" md="6" class="pa-0">
                  <div class="h-100" style="min-height: 400px">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1191.944675246076!2d6.284606031104233!3d50.54385573957385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf7927956feae7%3A0xcf04e9b223ebbe24!2sSt.%20Cornelius%20Sch%C3%BCtzenbruderschaft%20Rohren!5e1!3m2!1sde!2sde!4v1766483755058!5m2!1sde!2sde" 
                      title="St. Cornelius Schützenbruderschaft Rohren"
                      width="100%" 
                      height="100%" 
                      style="border:0; display: block;" 
                      allowfullscreen="" 
                      loading="lazy" 
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </VCol>
                
                <VCol cols="12" md="6">
                  <div class="pa-6">
                    <h2 class="text-h4 font-weight-bold mb-6">Finden Sie uns</h2>
                    
                    <div class="d-flex align-start mb-4">
                      <VIcon color="primary" class="mr-3 mt-1">mdi-map-marker</VIcon>
                      <div>
                        <h4 class="text-subtitle-1 font-weight-bold mb-1">Adresse</h4>
                        <p class="mb-0">Im Johannesfeld<br>52156 Monschau</p>
                      </div>
                    </div>
                    
                    <div class="d-flex align-start mb-4">
                      <VIcon color="primary" class="mr-3 mt-1">mdi-email</VIcon>
                      <div>
                        <h4 class="text-subtitle-1 font-weight-bold mb-1">E-Mail</h4>
                        <p class="mb-0">info@schuetzen-rohren.de</p>
                      </div>
                    </div>
                    
                  </div>
                </VCol>
              </VRow>
            </VCard>
            
            <SectionTitle
              title="Kontaktformular"
              subtitle="Haben Sie Fragen oder Anregungen? Schreiben Sie uns!"
            />
            
            <VCard class="form-container">
              <VCardText>
                <VForm ref="form" @submit.prevent="submitForm">
                  <VRow>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="formData.name"
                        label="Name *"
                        required
                        variant="outlined"
                        color="primary"
                        :rules="[v => !!v || 'Name ist erforderlich']"
                      />
                    </VCol>
                    
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="formData.email"
                        label="E-Mail *"
                        required
                        variant="outlined"
                        color="primary"
                        type="email"
                        :rules="[
                          v => !!v || 'E-Mail ist erforderlich',
                          v => /.+@.+\..+/.test(v) || 'E-Mail muss gültig sein'
                        ]"
                      />
                    </VCol>
                    
                    <VCol cols="12">
                      <VTextField
                        v-model="formData.subject"
                        label="Betreff *"
                        required
                        variant="outlined"
                        color="primary"
                        :rules="[v => !!v || 'Betreff ist erforderlich']"
                      />
                    </VCol>
                    
                    <VCol cols="12">
                      <VSelect
                        v-model="formData.category"
                        :items="categories"
                        label="Kategorie *"
                        required
                        variant="outlined"
                        color="primary"
                        :rules="[v => !!v || 'Kategorie ist erforderlich']"
                      />
                    </VCol>
                    
                    <VCol cols="12">
                      <VTextarea
                        v-model="formData.message"
                        label="Nachricht *"
                        required
                        variant="outlined"
                        color="primary"
                        rows="6"
                        :rules="[v => !!v || 'Nachricht ist erforderlich']"
                      />
                    </VCol>
                    
                    <VCol cols="12">
                      <VCheckbox
                        v-model="formData.newsletter"
                        color="primary"
                        label="Ich möchte den Newsletter erhalten"
                      />
                    </VCol>
                    
                    <VCol cols="12">
                      <VCheckbox
                        v-model="formData.privacy"
                        color="primary"
                        label="Ich habe die Datenschutzerklärung gelesen und stimme zu *"
                        required
                        :rules="[v => !!v || 'Zustimmung ist erforderlich']"
                      />
                    </VCol>
                  </VRow>
                  
                  <div class="d-flex justify-end mt-4">
                    <VBtn
                      type="button"
                      variant="tonal"
                      color="error"
                      class="mr-4"
                      @click="resetForm"
                    >
                      Zurücksetzen
                    </VBtn>
                    <VBtn
                      type="submit"
                      color="primary"
                      :loading="loading"
                    >
                      Senden
                    </VBtn>
                  </div>
                </VForm>
              </VCardText>
            </VCard>
            
            <VSnackbar
              v-model="snackbar.show"
              :color="snackbar.color"
              :timeout="5000"
            >
              {{ snackbar.text }}
              
              <template v-slot:actions>
                <VBtn
                  variant="text"
                  @click="snackbar.show = false"
                >
                  Schließen
                </VBtn>
              </template>
            </VSnackbar>
          </VCol>
        </VRow>
      </VContainer>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, reactive } from 'vue';

const form = ref(null);
const loading = ref(false);
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success'
});

const categories = [
  'Allgemeine Anfrage',
  'Mitgliedschaft',
  'Kursanmeldung',
  'Buchungsanfrage',
  'Presse/Medien',
  'Sonstiges'
];

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  category: '',
  message: '',
  newsletter: false,
  privacy: false
});

const submitForm = async () => {
  const { valid } = await form.value.validate();
  
  if (valid) {
    loading.value = true;
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      snackbar.text = 'Vielen Dank für Ihre Nachricht! Wir werden uns schnellstmöglich bei Ihnen melden.';
      snackbar.color = 'success';
      snackbar.show = true;
      
      resetForm();
    } catch (error) {
      console.error('Form submission error:', error);
      
      snackbar.text = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';
      snackbar.color = 'error';
      snackbar.show = true;
    } finally {
      loading.value = false;
    }
  }
};

const resetForm = () => {
  form.value.reset();
  Object.keys(formData).forEach(key => {
    if (typeof formData[key] === 'boolean') {
      formData[key] = false;
    } else {
      formData[key] = '';
    }
  });
};
</script>

<style>
/* Remove double borders from form fields */
.v-field--variant-outlined .v-field__input {
  border: none !important;
  box-shadow: none !important;
}

.v-field--variant-outlined .v-field__input input,
.v-field--variant-outlined .v-field__input textarea {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

/* Ensure only the outer outline is visible */
.v-field--variant-outlined .v-field__outline {
  border-color: rgba(var(--v-border-color), 0.38);
}

.v-field--variant-outlined.v-field--focused .v-field__outline {
  border-color: rgb(var(--v-theme-primary));
  border-width: 2px;
}

/* Remove any inner field styling that creates double borders */
.v-field__field {
  border: none !important;
}

.v-field__input {
  border: none !important;
}

/* Style select dropdown to match */
.v-select .v-field__input {
  border: none !important;
}

.form-container {
  border-radius: 8px;
  overflow: hidden;
}
</style>