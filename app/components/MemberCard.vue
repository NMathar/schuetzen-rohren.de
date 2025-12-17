<template>
  <VCard class="member-card h-100" elevation="3">
    <div class="position-relative">
      <VImg :src="member.image" :alt="member.name" height="280" cover />
      <div class="member-overlay d-flex flex-column justify-end pa-4">
        <h3 class="text-h5 text-white font-weight-bold mb-1">{{ member.name }}</h3>
        <p class="text-white text-body-2">{{ member.position }}</p>
      </div>
    </div>
    
    <VCardText>
      <p class="text-body-2 member-bio">{{ member.bio }}</p>
      
      <VDivider class="my-4" />
      
      <div v-if="member.achievements && member.achievements.length" class="mb-4">
        <p class="text-subtitle-2 font-weight-bold mb-2">Auszeichnungen:</p>
        <ul class="pa-0 ml-4">
          <li v-for="(achievement, index) in member.achievements" :key="index" class="text-body-2 mb-1">
            {{ achievement }}
          </li>
        </ul>
      </div>
      
      <div class="d-flex mt-4">
        <VBtn
          v-if="member.email"
          icon
          variant="text"
          color="primary"
          :href="`mailto:${member.email}`"
          class="mr-2"
        >
          <VIcon>mdi-email</VIcon>
        </VBtn>
        
        <VBtn
          v-if="member.phone"
          icon
          variant="text"
          color="primary"
          :href="`tel:${member.phone}`"
          class="mr-2"
        >
          <VIcon>mdi-phone</VIcon>
        </VBtn>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup>
defineProps({
  member: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.member-card {
  transition: all 0.3s ease;
  overflow: hidden;
}

.member-card:hover {
  box-shadow: 0 8px 20px rgba(74, 103, 65, 0.15) !important;
  background: linear-gradient(135deg, #fff 0%, #F5F5F0 100%) !important;
}

.member-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent);
  transition: all 0.3s ease;
}

.member-bio {
  min-height: 120px;
}
</style>