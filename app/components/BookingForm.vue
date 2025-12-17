<template>
  <div class="booking-form-container">
    <VForm ref="form" @submit.prevent="submitForm">
      <p class="text-h6 font-weight-bold mb-4">Reservierung für: {{ facilityName }}</p>
      
      <VRow>
        <VCol cols="12" md="6">
          <VTextField
            v-model="formData.name"
            label="Name *"
            required
            variant="outlined"
            :rules="[v => !!v || 'Name ist erforderlich']"
          />
        </VCol>
        
        <VCol cols="12" md="6">
          <VTextField
            v-model="formData.email"
            label="E-Mail *"
            required
            variant="outlined"
            type="email"
            :rules="[
              v => !!v || 'E-Mail ist erforderlich',
              v => /.+@.+\..+/.test(v) || 'E-Mail muss gültig sein'
            ]"
          />
        </VCol>
        
        <VCol cols="12" md="6">
          <VTextField
            v-model="formData.phone"
            label="Telefon *"
            required
            variant="outlined"
            :rules="[v => !!v || 'Telefon ist erforderlich']"
          />
        </VCol>
        
        <VCol cols="12" md="6">
          <VSelect
            v-model="formData.eventType"
            :items="eventTypes"
            label="Art der Veranstaltung *"
            required
            variant="outlined"
            :rules="[v => !!v || 'Veranstaltungsart ist erforderlich']"
          />
        </VCol>
        
        <VCol cols="12" md="6">
          <VTextField
            v-model="formData.date"
            label="Datum *"
            required
            variant="outlined"
            type="date"
            :rules="[v => !!v || 'Datum ist erforderlich']"
          />
        </VCol>
        
        <VCol cols="12" md="6">
          <VTextField
            v-model="formData.time"
            label="Uhrzeit *"
            required
            variant="outlined"
            type="time"
            :rules="[v => !!v || 'Uhrzeit ist erforderlich']"
          />
        </VCol>
        
        <VCol cols="12" md="6">
          <VTextField
            v-model="formData.duration"
            label="Dauer (Stunden) *"
            required
            variant="outlined"
            type="number"
            min="1"
            :rules="[v => !!v || 'Dauer ist erforderlich']"
          />
        </VCol>
        
        <VCol cols="12" md="6">
          <VTextField
            v-model="formData.guests"
            label="Anzahl der Gäste *"
            required
            variant="outlined"
            type="number"
            min="1"
            :rules="[v => !!v || 'Anzahl der Gäste ist erforderlich']"
          />
        </VCol>
        
        <VCol cols="12">
          <VTextarea
            v-model="formData.notes"
            label="Anmerkungen"
            variant="outlined"
            rows="3"
          />
        </VCol>
        
        <VCol cols="12">
          <VCheckbox
            v-model="formData.terms"
            label="Ich stimme den Nutzungsbedingungen zu *"
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
          Anfrage senden
        </VBtn>
      </div>
    </VForm>
    
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  facilityId: {
    type: [String, Number],
    required: true
  },
  facilityName: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['bookingSubmitted']);

const form = ref(null);
const loading = ref(false);
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success'
});

const eventTypes = [
  'Geburtstag',
  'Jubiläum',
  'Betriebsfeier',
  'Hochzeit',
  'Vereinstreffen',
  'Seminar',
  'Sonstiges'
];

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  eventType: '',
  date: '',
  time: '',
  duration: '',
  guests: '',
  notes: '',
  terms: false
});

const submitForm = async () => {
  const { valid } = await form.value.validate();
  
  if (valid) {
    loading.value = true;
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      snackbar.text = 'Ihre Buchungsanfrage wurde erfolgreich gesendet!';
      snackbar.color = 'success';
      snackbar.show = true;
      
      emit('bookingSubmitted', {
        ...formData,
        facilityId: props.facilityId
      });
      
      resetForm();
    } catch (error) {
      console.error('Booking error:', error);
      
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
    if (key === 'terms') {
      formData[key] = false;
    } else {
      formData[key] = '';
    }
  });
};
</script>

<style scoped>
.booking-form-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 24px;
}
</style>