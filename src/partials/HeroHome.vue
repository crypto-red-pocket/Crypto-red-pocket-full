<template>
  <section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pt-32 pb-10 md:pt-40 md:pb-16">

        <!-- Hero content -->
        <div class="md:grid md:grid-cols-12 md:gap-12 lg:gap-20 items-center">

          <!-- Content -->
          <div class="md:col-span-7 lg:col-span-7 mb-8 md:mb-0 text-center md:text-left">
            <h1 class="h1 lg:text-6xl mb-4 font-red-hat-display font-extrabold" data-aos="fade-down">Mint your Ecstasy NFT</h1>
            <p class="text-xl text-gray-600 dark:text-gray-400" data-aos="fade-down" data-aos-delay="150">Support people's health harm reduction by minting a unique NFT that helps alert adulterated MDMA (Ecstasy) in festivals and events. This will generate a traceability of pills using blockchain technology around the world, leading to better decision-making for consumers over their health.</p>
            <!-- CTA form -->
            <form class="mt-8" data-aos="fade-down" data-aos-delay="300">
              <div class="flex flex-col sm:flex-row justify-start max-w-sm mx-auto sm:max-w-md md:mx-0">
                <ConnectButton
                  v-if="!currentAccount"
                  button-class="px-8 py-4 text-xl text-white bg-teal-500 hover:bg-teal-400 rounded-lg"
                />
                <BaseButton
                  v-else-if="!isLoading"
                  @click="mintNft"
                  button-class="px-8 py-4 text-xl text-white bg-teal-500 hover:bg-teal-400 rounded-lg"
                  inner-text="Mint NFT"
                />
                <div
                  v-else
                  class="px-8 py-4 text-xl text-white bg-teal-500 hover:bg-teal-400 rounded-lg flex flex-wrap items-center"
                >
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading
                </div>
              </div>
              <!-- Success message -->
              <Transition name="fade">
                <div
                  v-show="showThankYou"  
                  class="pt-4"
                >
                  <span class="uppercase text-base font-bold text-green-600/80 transition-all duration-300">Thank You for supporting</span>
                </div>                
              </Transition>
              <!-- <p class="text-center md:text-left mt-2 opacity-75 text-sm">Thanks for subscribing!</p> -->
            </form>
            <ul class="max-w-sm sm:max-w-md mx-auto md:max-w-none text-gray-600 dark:text-gray-400 mt-8 -mb-2" data-aos="fade-down" data-aos-delay="450">
              <li class="flex items-center mb-2">
                <svg class="w-3 h-3 fill-current text-teal-400 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Support pill testing across multiple festivals and events.</span>
              </li>
              <li class="flex items-center mb-2">
                <svg class="w-3 h-3 fill-current text-teal-400 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Collect an unique NFT art piece.</span>
              </li>
              <li class="flex items-center mb-2">
                <svg class="w-3 h-3 fill-current text-teal-400 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Get access to VIP lounges in festivals.</span>
              </li>
            </ul>
          </div>

          <!-- Mobile mockup -->
          <div class="md:col-span-5 lg:col-span-5 text-center md:text-right" data-aos="fade-up" data-aos-delay="450">
            <div class="inline-flex relative justify-center items-center">
              <!-- Glow illustration -->
              <svg class="absolute mr-12 mt-32 pointer-events-none -z-1 dark:opacity-40" aria-hidden="true" width="678" height="634" viewBox="0 0 678 634" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="240" cy="394" r="240" fill="url(#piphoneill_paint0_radial)" fill-opacity=".4" />
                <circle cx="438" cy="240" r="240" fill="url(#piphoneill_paint1_radial)" fill-opacity=".6" />
                <defs>
                  <radialGradient id="piphoneill_paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -77 317) scale(189.054)">
                    <stop stop-color="#667EEA" />
                    <stop offset="1" stop-color="#667EEA" stop-opacity=".01" />
                  </radialGradient>
                  <radialGradient id="piphoneill_paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 99 339) scale(189.054)">
                    <stop stop-color="#9F7AEA" />
                    <stop offset="1" stop-color="#9F7AEA" stop-opacity=".01" />
                  </radialGradient>
                </defs>
              </svg>
              <!-- Image inside mockup size: 290x624px (or 580x1248px for Retina devices) -->
              <img class="" src="../images/skull-pill.png" width="340" height="624" style="max-width: 84.33%;" alt="Features illustration" />
            </div>
          </div>

        </div>
        
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { currentAccount } from './../composables/useWallet'
import BaseButton from './BaseButton.vue';
import ConnectButton from './ConnectButton.vue';
import { mint } from './../composables/contracts/useEnvelopesContract'

const isLoading = ref(false)
const showThankYou = ref(false)

const emit = defineEmits<{
  (event: "onAvatarMinted"): void;
}>();

async function mintNft () {
  isLoading.value = true

  await mint()

  showThankYou.value = true

  // Waits metadata indexing by Moralis
  setTimeout(() => {
    emit("onAvatarMinted")
  }, 15000)

  await setTimeout(() => {
    showThankYou.value = false
  }, 5000)

  isLoading.value = false
}
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