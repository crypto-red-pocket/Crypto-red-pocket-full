<template>
  <section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex h-[70vh] container mx-auto pt-56 gap-16">
        <section class="flex flex-1 text-white">
          <div class="">
            <h1 class="text-6xl font-semibold">Welcome</h1>
            <sub class="text-2xl text-lightViolet">
              You have been invited to a Red Envelope
            </sub>
            <p class="text-lightGrey mt-5">
              An envelope is Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
              laboriosam aliquid unde ipsam, similique alias magnam quis eum
              numquam saepe dignissimos minus magni natus quae corporis
              architecto aliquam voluptas.
            </p>
            <div class="flex flex-col sm:flex-row justify-start max-w-sm mx-auto sm:max-w-md md:mx-0 pt-6">
              <ConnectButton
                v-if="!currentAccount"
                button-class="px-8 py-4 text-xl base-btn"
              />
              <BaseButton
                v-else-if="!isLoading && canParticipate"
                @click="participateInEnvelope"
                button-class="px-8 py-4 text-xl base-btn"
                inner-text="Participate"
              />
              <BaseButton
                v-else-if="!isLoading && !canParticipate"
                button-class="px-8 py-4 text-xl base-btn pointer-events-none opacity-50"
                inner-text="You have already participated"
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
        <div class="flex flex-1 flex-col">
          <h2 class="text-2xl font-semibold">Envelope Info:</h2>
          <div class="text-white pl-6 pb-8 pt-6 grid grid-cols-3 gap-2">
            <div class="col-span-3">
              <div class="font-semibold">
                Message:
              </div>
              <div class="opacity-70">
                Message
              </div>
            </div>
            <div>
              <div class="font-semibold">
                Participants:
              </div>
              <div class="opacity-70">
                1 / 8
              </div>
            </div>
            <div>
              <div class="font-semibold">
                Prize:
              </div>
              <div class="opacity-70">
                1000 MATIC
              </div>
            </div>
            <div>
              <div class="font-semibold">
                Date:
              </div>
              <div class="opacity-70">
                Unavailable
              </div>
            </div>
          </div>

          <h2 class="text-2xl font-semibold">Leaderboard:</h2>
        </div>
      </div>      
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { currentAccount } from '../composables/useWallet'
import BaseButton from './BaseButton.vue';
import ConnectButton from './ConnectButton.vue';
import { participate, getEnvelopeById } from '../composables/contracts/useEnvelopesContract'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoading = ref(false)
const showThankYou = ref(false)
const canParticipate = ref(true)
const envelopeId = ref('')

// const envelopeCreationTime = ""

async function participateInEnvelope () {
  isLoading.value = true

  await participate(envelopeId.value)

  showThankYou.value = true

  await setTimeout(() => {
    showThankYou.value = false
  }, 5000)

  isLoading.value = false
}

async function fetchEnvelope () {
  envelopeId.value = String(route.params.envelopeId)
  await getEnvelopeById(envelopeId.value)
    .then(res => console.log(res));
}

onMounted(async () => {
  await fetchEnvelope()
})
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