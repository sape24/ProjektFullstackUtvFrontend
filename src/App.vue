<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/headerComponent.vue'
</script>

<template>
  <HeaderComponent />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
