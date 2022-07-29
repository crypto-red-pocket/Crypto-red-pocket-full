<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">
      <section class="">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
          <div class="pt-32 pb-12 md:pt-64 md:pb-20 text-center">
            <h1 class="h3 font-red-hat-display mb-8">Apparently the network <span class="font-bold text-lightBlue">{{ networkName }}</span> isn't in your wallet.</h1>
            <a class="base-btn" href="https://chainlist.org/" target="_blank">
              <span>Add network to wallet</span>
            </a>
          </div>
        </div>
      </section>

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './../partials/Header.vue'
import Footer from './../partials/Footer.vue'
import { NetworkEnum } from '../composables/network.enum'

const route = useRoute()

const networkName = computed(() => {
  return String(NetworkEnum[Number(route.params.networkId)])
})

</script>
