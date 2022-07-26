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
      <Carousel
        v-if="!isLoading"
        :pills="collection"
        class="pt-16"
      />

      <div v-else>
        <div class="text-center text-5xl pt-56 font-bold text-white/40">
          LOADING
        </div>
      </div>
    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Header from './../partials/Header.vue'
import PageIllustration from './../partials/PageIllustration.vue'
import Carousel from '../partials/Carousel.vue'
import Footer from '../partials/Footer.vue'

const isLoading = ref(true);
const collection = ref([]);

onMounted(async () => {
  isLoading.value = true
  await fetch(`https://deep-index.moralis.io/api/v2/nft/${import.meta.env.VITE_ENVELOPES_CONTRACT}?chain=rinkeby&format=decimal`, {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'kcxhRlOE3tiqR8nQHtXfWd1Rew9PSvTcGj2sP6CL7Hl1sJPsP4CxofWlDDRuu6fK'
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      collection.value = data.result
    })
    .finally(() => {
        isLoading.value = false
      }
    )
})
</script>