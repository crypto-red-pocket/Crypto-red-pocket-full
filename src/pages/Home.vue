<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page illustration -->
      <div class="relative max-w-6xl mx-auto h-0 pointer-events-none -z-1" aria-hidden="true">
        <PageIllustration />
      </div>

      <!-- Page sections -->
      <HeroHome />

      <Transition name="fade">
        
      </Transition>

      <TestimonialsBlocks />

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { currentAccount } from './../composables/useWallet'


import Header from './../partials/Header.vue'
import PageIllustration from './../partials/PageIllustration.vue'
import HeroHome from './../partials/HeroHome.vue'
import TestimonialsBlocks from './../partials/TestimonialsBlocks.vue'
import Footer from './../partials/Footer.vue'

watch(
  [currentAccount],
  () => {
    if(currentAccount.value) {

    }
  },
  { immediate: true }
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>