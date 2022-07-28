<template>
  <div class="scroll-smooth font-inter text-white w-screen bg-gradient-to-tr from-darkViolet to-darkRed bg-fixed transition-all">
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-out duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="currentAccount && isOpen"
        class="absolute md:fixed w-full min-h-screen bg-darkestBlue/95 flex items-center z-50"
      >
        <button
          @click="isOpen = false"
          class="top-5 right-5 rounded-full h-10 w-10 font-bold bg-white text-darkBlue absolute hover:opacity-75"
        > X</button>
        <CreateEnvelopeForm/>
      </div>
    </transition>

    <router-view />
  </div>
</template>

<script setup lang="ts">
import CreateEnvelopeForm from './partials/CreateEnvelopeForm.vue'

import AOS from 'aos'
import { onMounted, onBeforeUnmount } from 'vue';
import {
  currentAccount,
  initializeWallet,
  removeWindowEthereumListeners
} from './composables/useWallet'
import { isOpen } from './composables/useCreateEnvelopeForm'

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
