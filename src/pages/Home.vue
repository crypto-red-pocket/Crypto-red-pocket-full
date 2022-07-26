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
      <HeroHome @on-avatar-minted="fetchOwnedCollection"/>

      <Transition name="fade">
        <Carousel
          v-if="currentAccount && collection && collection[0]"
          :show-info="false"
          :pills="collection"
        />
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
import Carousel from './../partials/Carousel.vue'
import TestimonialsBlocks from './../partials/TestimonialsBlocks.vue'
import Footer from './../partials/Footer.vue'

const collection = ref([])

async function fetchOwnedCollection () {
  collection.value = []
  await fetch(`https://deep-index.moralis.io/api/v2/${currentAccount.value}/nft?chain=rinkeby&format=decimal&token_addresses=${import.meta.env.VITE_ENVELOPES_CONTRACT}`, {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'kcxhRlOE3tiqR8nQHtXfWd1Rew9PSvTcGj2sP6CL7Hl1sJPsP4CxofWlDDRuu6fK'
    },
  })
    .then(response => response.json())
    .then(data => {
      // console.log('Success:', data);
      collection.value = data.result
    })
}

watch(
  [currentAccount],
  () => {
    if(currentAccount.value) {
      fetchOwnedCollection()
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