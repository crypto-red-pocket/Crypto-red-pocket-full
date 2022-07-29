<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroHome />
      <HeroAbout />
      <HeroTeam />
      <HeroContact />
    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script setup lang="ts">
import Header from './../partials/Header.vue'
import HeroHome from './../partials/HeroHome.vue'
import HeroAbout from './../partials/HeroAbout.vue'
import HeroTeam from './../partials/HeroTeam.vue'
import HeroContact from './../partials/HeroContact.vue'
import Footer from './../partials/Footer.vue'
</script>