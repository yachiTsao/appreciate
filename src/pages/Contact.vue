<template>
  <div class="fill-height">
    <v-card class="fill-height v-custom-background">
      <v-sheet width="85%" class="pa-2 mx-auto" color="transparent">
        <div class="d-flex justify-space-between pa-4">
          <p>{{ $t("general.contactUs") }}</p>
        </div>
        <v-row class="ma-0">
          <v-col class="py-0">
            <v-sheet width="100%" height="400"> </v-sheet>
          </v-col>
          <v-col class="py-0">
            <VCustomCard :color="'fifth'">
              <template #title>
                <p>Send us a message</p>
              </template>
              <template #content>
                <v-form ref="form" v-model="isFormValid">
                  <VTextInput
                    :displayName="'general.contactForm.name'"
                    class="px-4 pt-0 pb-4 v-col-12"
                  />
                  <VTextInput
                    :displayName="'general.contactForm.email'"
                    class="px-4 pt-0 pb-4 v-col-12"
                  />
                  <VTextInput
                    :displayName="'general.contactForm.phone'"
                    class="px-4 pt-0 pb-4 v-col-12"
                  />
                  <v-textarea>
                    
                  </v-textarea>
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
