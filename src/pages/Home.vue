<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroHome />
      <HeroAbout />

      <Transition name="fade">
        
      </Transition>

      <TestimonialsBlocks />

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script setup lang="ts">
import Header from './../partials/Header.vue'
import HeroHome from './../partials/HeroHome.vue'
import HeroAbout from './../partials/HeroAbout.vue'
import TestimonialsBlocks from './../partials/TestimonialsBlocks.vue'
import Footer from './../partials/Footer.vue'
</script>