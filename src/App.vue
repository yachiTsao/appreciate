<template>
  <v-app>
    <VNavbar />
    <!-- <VSideMenu/> -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import VNavbar from "./components/Navbar.vue";
</script>
<style lang="scss" src="./styles/App.scss"></style>
