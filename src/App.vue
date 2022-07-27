<template>
  <div class="scroll-smooth font-inter text-white w-screen bg-gradient-to-tr from-darkViolet to-darkRed bg-fixed">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import AOS from 'aos'
import { onMounted, onBeforeUnmount } from 'vue';
import {
  initializeWallet,
  removeWindowEthereumListeners
} from './composables/useWallet'

onMounted(() => {
  initializeWallet()
  AOS.init({
    once: true,
    disable: 'phone',
    duration: 600,
    easing: 'ease-out-sine',
  })
})

onBeforeUnmount(() => {
  removeWindowEthereumListeners()
})
</script>
