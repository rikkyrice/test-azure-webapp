<template>
  <q-layout>
    <app-header />
    <q-page-container class="q-pa-lg">
      <ErrorModal />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import AppHeader from "./components/layout/AppHeader.vue"
import ErrorModal from "./components/layout/ErrorModal.vue";

</script>