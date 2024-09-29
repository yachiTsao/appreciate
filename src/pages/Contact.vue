<template>
  <div class="fill-height">
    <v-card class="fill-height v-custom-background">
      <v-sheet width="85%" class="pa-2 mx-auto" color="transparent">
        <div class="d-flex justify-space-between pa-4">
          <p>{{ $t("general.contactUs") }}</p>
        </div>
        <v-row class="ma-0">
          <v-col class="py-0 align-self-center">
            <VCustomCard :color="'fifth'" class="custom-card">
              <template #content>
                <div
                  class="fill-height d-flex align-start justify-center flex-column text-primary-dark"
                >
                  <v-row class="ma-0 px-4">
                    <v-icon class="pa-5 d-flex align-self-center" size="22"
                      >mdi-account-box-outline</v-icon
                    >
                    <div class="d-flex align-self-center flex-column">
                      <span>Contact Us</span>
                      <p>(02) 222 333 6666</p>
                    </div>
                  </v-row>
                  <v-row class="ma-0 px-4">
                    <v-icon class="pa-5 d-flex align-self-center" size="22"
                      >mdi-email-check-outline</v-icon
                    >
                    <div class="d-flex align-self-center flex-column">
                      <span>Email</span>
                      <p>Support@example.com</p>
                    </div>
                  </v-row>
                  <v-row class="ma-0 px-4">
                    <v-icon class="pa-5 d-flex align-self-center" size="22"
                      >mdi-map-marker-outline</v-icon
                    >
                    <div class="d-flex align-self-center flex-column">
                      <span>Address</span>
                      <p>台北市信義區123號</p>
                    </div>
                  </v-row>
                  <v-row class="ma-0 px-4 pb-8">
                    <v-icon class="pa-5 d-flex align-self-center" size="22"
                      >mdi-store-clock-outline</v-icon
                    >
                    <div class="d-flex align-self-center flex-column">
                      <span>Business Hours</span>
                      <p>週一至週五 09:00 - 18:00</p>
                    </div>
                  </v-row>
                </div>
              </template>
            </VCustomCard>
          </v-col>
          <v-col class="py-0">
            <VCustomCard :color="'fifth'">
              <template #title>
                <p class="text-primary-dark">Send us a message</p>
              </template>
              <template #content>
                <v-form ref="form" v-model="isFormValid">
                  <VTextInput
                    :displayName="'general.contactForm.name'"
                    :placeholder="'general.contactForm.namePlaceholder'"
                    class="px-4 pt-0 pb-4 v-col-12"
                  />
                  <VTextInput
                    :displayName="'general.contactForm.email'"
                    :placeholder="'general.contactForm.emailPlaceholder'"
                    class="px-4 pt-0 pb-4 v-col-12"
                  />
                  <VTextInput
                    :displayName="'general.contactForm.phone'"
                    :placeholder="'general.contactForm.phonePlaceholder'"
                    class="px-4 pt-0 pb-4 v-col-12"
                  />
                  <div class="d-flex flex-column px-4">
                    <p class="v-text-body-2 mb-2 text-primary-dark">
                      {{ $t("general.contactForm.message") }}
                    </p>
                    <v-textarea
                      variant="outlined"
                      base-color="primary"
                      color="primary"
                      auto-grow
                      class="pb-2"
                      :placeholder="
                        $t('general.contactForm.messagePlaceholder')
                      "
                    />
                  </div>
                  <div class="d-flex justify-end">
                    <v-btn
                      color="primary"
                      height="34"
                      :disabled="!isFormValid"
                      class="mx-4 text-primary-dark"
                    >
                      {{ $t("general.contactForm.submit") }}
                    </v-btn>
                  </div>
                </v-form>
              </template>
            </VCustomCard>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import VCustomCard from "@/components/general/VCustomCard.vue";
import VTextInput from "@/components/general/VTextInput.vue";
let isFormValid = ref(false);
</script>
<style lang="scss" scoped>
.custom-card {
  height: 300px !important;
}
</style>
