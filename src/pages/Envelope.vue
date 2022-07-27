<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">
      <HeroEnvelope />
    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script setup lang="ts">
import Header from './../partials/Header.vue'
import HeroEnvelope from './../partials/HeroEnvelope.vue'
import Footer from '../partials/Footer.vue'
</script>