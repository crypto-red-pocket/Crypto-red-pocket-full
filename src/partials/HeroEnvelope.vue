<template>
   <section v-if="isValidEnvelope && isInitialLoading">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="pt-32 pb-12 md:pt-64 md:pb-20 text-center">
        <h1 class="h3 text-6xl font-red-hat-display mb-2 opacity-50">Loading...</h1>
      </div>
    </div>
  </section>
  <section v-else-if="isValidEnvelope && !isInitialLoading">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-32">
      <div
        class="w-full flex justify-center"
      >
        <BaseButton
          @click="copyRegisterURL"
          :class="registerLinkCopied ? 'opacity-50 pointer-events-none':''"
          button-class="px-8 py-4 text-xl base-btn text-white transition-all"
          :inner-text="registerLinkCopied ? '🔗 LINK COPIED 🔗' : '🔗 SHARE POCKET LINK 🔗'"
        />
      </div>
      <div class="grid grid-cols-1 lg:flex md:min-h-[70vh] container mx-auto pb-20 pt-12 gap-16">
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
                inner-text="You have participated"
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

        <section
          class="flex flex-col justify-center items-center rounded-xl
            bg-envelopeCard bg-cover w-full lg:w-2/3 py-16 px-20
            hover:scale-105 hover:translate-x-2 ease-in-out duration-700
            drop-shadow-2xl relative"
        >
          <header class="text-lg text-lightViolet uppercase tracking-widest pb-8">
            Envelope Details
          </header>

          <div class="flex flex-col gap-8 items-center w-full">
            <section class="flex flex-col gap-2 text-left w-full">
              <div class="">
                <sub class="text-lightRed uppercase tracking-widest font-light">
                  Created By
                </sub>
                <h3 class="text-3xl">{{ envelope.creatorNickname }}</h3>
              </div>
              <div>
                <sub class="text-lightRed uppercase tracking-widest font-light">
                  Message
                </sub>
                <p class="text-lg">
                  {{ envelope.message }}
                </p>
              </div>
            </section>
            <!-- {/* Bottom Section */} -->
            <section
              class="flex justify-between w-full
              bg-black/50 rounded-lg p-5"
            >
              <div>
                <sub class="text-lightRed uppercase tracking-widest font-light">
                  Total Prize Amt.
                </sub>
                <p class="text-2xl pt-1">{{ ethers.utils.formatEther(envelope.totalTokenAmount.toNumber()) }} {{ currentNetworkSymbol }}</p>
              </div>
              <div>
                <sub class="text-lightRed uppercase tracking-widest font-light">
                  Participants
                </sub>
                <p class="text-2xl pt-1">{{`${envelope.participants.length} / ${envelope.participantsLimit.toNumber()}`}}</p>
              </div>

              <!-- <div>
                <sub class="text-lightRed uppercase tracking-widest font-light">
                  Valid Till
                </sub>
                <p class="text-xl pt-1">{{ new Date(envelope.creationTime.toNumber() * 1000).toLocaleString() }}</p>
              </div> -->
            </section>
          </div>
        </section>
      </div>      
    </div>

    <!-- Leaderboard -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 w-full text-center py-10">
      <header class="text-4xl text-lightViolet font-semibold pb-5">
        Leaderboard
      </header>

      <table class="w-full table-auto rounded-lg">
        <thead class="h-16 bg-black border-lightViolet/10 border-2 text-lg text-lightRed">
          <th class="font-normal px-5 text-left">#</th>
          <th class="font-normal px-5 hidden lg:table-cell">Address</th>
          <th class="font-normal px-5">Amt. Won</th>
        </thead>
        <tbody class="">
            <tr
              v-for="(participant, index) in envelope.participants"
              :key="index"
              class="hover:bg-darkViolet h-16 border-lightViolet/10 border-2"
            >
              <td class="pl-5 lg:px-5 text-left">
                {{ index + 1 }}                
                <span
                  v-if="currentAccount === participant"
                  class="text-white rounded-md font-bold bg-lightViolet px-2 ml-2"
                >
                  YOU
                </span>
              </td>
              <td
                class="px-5 text-center hidden lg:table-cell"  
              >
                {{ truncateAddress(participant, 15) }}
              </td>
              <td class="lg:px-5 text-center">{{ ethers.utils.formatEther(envelope.participantsPrize[index].toNumber()) }} {{ currentNetworkSymbol }}</td>
            </tr>
        </tbody>
      </table>
      <h2 v-if="!envelope.participants[0]" class="text-xl py-5 opacity-50 font-bold">NO PARTICIPANTS YET</h2>
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
import { ethers } from 'ethers'
import { ref, computed, watch } from 'vue'
import { currentAccount, currentNetworkId, switchNetwork, currentNetworkSymbol } from '../composables/useWallet'
import BaseButton from './BaseButton.vue';
import ConnectButton from './ConnectButton.vue';
import { truncateAddress } from '../utils';
import { participate, getEnvelopeById } from '../composables/contracts/useEnvelopesContract'
import { useRoute, useRouter } from 'vue-router'
import { BigNumber } from 'ethers'
import { NetworkEnum } from '../composables/network.enum'

interface Envelope {
  creator: string,
  creatorNickname: string,
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
const router = useRouter()

const registerLinkCopied = ref(false)
const isValidEnvelope = ref(true)
const isInitialLoading = ref(true)
const isLoading = ref(false)
const envelope = ref<Envelope>(
  {
    creatorNickname: '',
    creator: '',
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
const registrationUrl = computed(() => `${window.location.origin}/envelope/${envelope.value.envelopeId}/${route.params.networkId}`)

async function participateInEnvelope () {
  isLoading.value = true

  await participate(envelope.value.envelopeId)
  await fetchEnvelope()

  isLoading.value = false
}

async function fetchEnvelope () {
  const routeEnvelopeId = String(route.params.envelopeId)
  await getEnvelopeById(routeEnvelopeId)
    .then(res => {
      envelope.value = {
        creatorNickname: res.creatorNickname,
        creator: res.creator,
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

function copyRegisterURL () {
  // https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
  const el = document.createElement('textarea')
  el.value = registrationUrl.value
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.opacity = '0'
  document.body.appendChild(el)

  if(document){
    // @ts-ignore: Object is possibly 'null'.
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
      // @ts-ignore: Object is possibly 'null'.
      document.getSelection().removeAllRanges()
      // @ts-ignore: Object is possibly 'null'.
      document.getSelection().addRange(selected)
    }
  }

  registerLinkCopied.value = true
  setTimeout(()=>{
    registerLinkCopied.value = false
  }, 3000)
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

watch(currentNetworkId, async () => {
  if(currentNetworkId.value !== NetworkEnum.NO_NET){
    await switchNetwork(Number(route.params.networkId))
      .catch((err) => {
        router.push({ path: `/network-not-found/${route.params.networkId}` })
      })

    await fetchEnvelope()
  }
}, { immediate: true })
</script>

<style lang="postcss" scoped>
.envelope-subtitle{
  @apply font-semibold text-lightViolet
}
</style>