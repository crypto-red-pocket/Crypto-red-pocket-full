<template>
   <section v-if="isValidEnvelope && isInitialLoading">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="pt-32 pb-12 md:pt-64 md:pb-20 text-center">
        <h1 class="h3 text-6xl font-red-hat-display mb-2 opacity-50">Loading...</h1>
      </div>
    </div>
  </section>
  <section v-else-if="isValidEnvelope && !isInitialLoading">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 md:flex md:h-[70vh] container mx-auto py-24 md:pt-56 gap-16">
        <section class="flex flex-1 text-white">
          <div class="">
            <h1 class="text-6xl font-semibold">Welcome</h1>
            <sub class="text-2xl text-lightViolet">
              You have been invited to a Red Pocket
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
                v-else-if="!isLoading && !canParticipate"
                button-class="px-8 py-4 text-xl base-btn pointer-events-none opacity-50"
                inner-text="You have already participated"
              />
              <BaseButton
                v-else-if="!isLoading && (envelope.participants.length >= envelope.participantsLimit.toNumber())"
                button-class="px-8 py-4 text-xl base-btn pointer-events-none opacity-50"
                inner-text="Pocket is full"
              />
              <BaseButton
                v-else-if="!isLoading && canParticipate"
                @click="participateInEnvelope"
                button-class="px-8 py-4 text-xl base-btn"
                inner-text="Participate"
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
          <h2 class="text-2xl font-semibold">Pocket Info:</h2>
          <div class="text-white pl-6 pb-8 pt-6 grid grid-cols-3 gap-2">
            <div class="col-span-3">
              <div class="envelope-subtitle">
                Message:
              </div>
              <div class="opacity-70">
                {{ envelope.message }}
              </div>
            </div>
            <div>
              <div class="envelope-subtitle">
                Participants:
              </div>
              <div class="opacity-70">
                {{`${envelope.participants.length} / ${envelope.participantsLimit.toNumber()}`}}
              </div>
            </div>
            <div>
              <div class="envelope-subtitle">
                Prize:
              </div>
              <div class="opacity-70">
                1000 MATIC
              </div>
            </div>
            <div>
              <div class="envelope-subtitle">
                Date:
              </div>
              <div class="opacity-70">
                {{ new Date(envelope.creationTime.toNumber() * 1000).toLocaleString() }}
              </div>
            </div>
          </div>

          <h2 class="text-2xl font-semibold">Leaderboard:</h2>
        </div>
      </div>      
    </div>
  </section>
  <section v-else>
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="pt-32 pb-12 md:pt-64 md:pb-20 text-center">
        <h1 class="h3 font-red-hat-display mb-8 md:mb-2">Hm, it appears that your envelope is invalid.</h1>
        <h1 class="h3 font-red-hat-display mb-12">Are you in the right network?</h1>
        <router-link class="base-btn" to="/">
          <span>Back to Home</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { currentAccount } from '../composables/useWallet'
import BaseButton from './BaseButton.vue';
import ConnectButton from './ConnectButton.vue';
import { participate, getEnvelopeById } from '../composables/contracts/useEnvelopesContract'
import { useRoute } from 'vue-router'
import { BigNumber } from 'ethers'

interface Envelope {
  envelopeId: string,
  message: string,
  participants: string[],
  participantsPrize: BigNumber[],
  participantsLimit: BigNumber,
  tokenAmount: BigNumber,
  totalTokenAmount: BigNumber,
  creationTime: BigNumber,
}

const route = useRoute()

const isValidEnvelope = ref(true)
const isInitialLoading = ref(true)
const isLoading = ref(false)
const showThankYou = ref(false)
const envelope = ref<Envelope>(
  {
    envelopeId: '',
    message: '',
    participants: [],
    participantsPrize: [],
    participantsLimit: BigNumber.from("0"),
    tokenAmount: BigNumber.from("0"),
    totalTokenAmount: BigNumber.from("0"),
    creationTime: BigNumber.from("0"),
  }
)

const canParticipate = computed(() => !envelope.value.participants.includes(currentAccount.value))

async function participateInEnvelope () {
  isLoading.value = true

  await participate(envelope.value.envelopeId)

  showThankYou.value = true

  await setTimeout(() => {
    showThankYou.value = false
  }, 5000)

  isLoading.value = false
}

async function fetchEnvelope () {
  const routeEnvelopeId = String(route.params.envelopeId)
  await getEnvelopeById(routeEnvelopeId)
    .then(res => {
      envelope.value = {
        envelopeId: res.envelopeId,
        message: res.message,
        participants: res.participants,
        participantsPrize: res.participantsPrize,
        participantsLimit: res.participantsLimit,
        tokenAmount: res.tokenAmount,
        totalTokenAmount: res.totalTokenAmount,
        creationTime: res.creationTime,
      }
    });
  
  checkValidEnvelope(envelope.value.envelopeId)
  isInitialLoading.value = false
}

function roughScale(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) { return 0; }
  return parsed * 100;
}

function checkValidEnvelope (envelopeId) {
  const normalizedEnvelopeId = roughScale(envelopeId, 16)

  if (normalizedEnvelopeId !== 0) {
    isValidEnvelope.value = true
  } else {
    isValidEnvelope.value = false
  }
}

onMounted(async () => {
  await fetchEnvelope()
})
</script>

<style lang="postcss" scoped>
.envelope-subtitle{
  @apply font-semibold text-lightViolet
}
</style>