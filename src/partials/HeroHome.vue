<template>
  <section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex h-[90vh] container mx-auto">
        <section className="flex flex-1 text-white items-center">
          <div className="">
            <h1 className="text-6xl font-semibold">Red Pocket</h1>
            <sub className="text-2xl text-lightViolet">
              DeFi Payments for your loved ones!
            </sub>
            <p className="text-lightGrey mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
              laboriosam aliquid unde ipsam, similique alias magnam quis eum
              numquam saepe dignissimos minus magni natus quae corporis
              architecto aliquam voluptas. Quasi, eos? Animi quod perferendis
              exercitationem iste molestias tempore ad voluptatum.
            </p>
            <div class="flex flex-col sm:flex-row justify-start max-w-sm mx-auto sm:max-w-md md:mx-0 pt-6">
              <ConnectButton
                v-if="!currentAccount"
                button-class="px-8 py-4 text-xl base-btn"
              />
              <BaseButton
                v-else-if="!isLoading"
                @click="create"
                button-class="px-8 py-4 text-xl base-btn"
                inner-text="Create Red Envelope"
              />
              <div
                v-else
                class="px-8 py-4 text-xl base-btn rounded-lg flex flex-wrap items-center"
              >
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-1">
           <iframe
              src="https://my.spline.design/interactivespherescopy-70c62ae8fc15dbaaa057919e8e43d896/"
              frameborder="0"
              width="100%"
              height="100%"
            ></iframe>
          <!-- <img class="" src="../images/skull-pill.png" width="340" height="624" style="max-width: 84.33%;" alt="Features illustration" /> -->
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
import { createEnvelope } from './../composables/contracts/useEnvelopesContract'

const isLoading = ref(false)
const showThankYou = ref(false)

async function create () {
  isLoading.value = true

  await createEnvelope(
    '0.0000001',
    5,
    'Welcome to the envelope.'
  )

  showThankYou.value = true

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