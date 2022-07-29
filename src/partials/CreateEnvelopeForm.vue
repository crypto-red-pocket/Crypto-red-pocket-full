<template>
  <div class="mx-auto w-2/3 text-center pt-10">   
    <header class="text-sm md:text-4xl text-lightViolet font-semibold pb-10">
      Create A New Envelope
    </header>
    <!-- {/* Form for creating envelope */} -->
    <form action="" class="pb-20 w-full gap-x-20 gap-y-5 grid grid-cols-1 md:grid-cols-2 ">
      <!-- {/* left side */} -->
      <section class="flex flex-col gap-8">
        <div class="w-full flex flex-col gap-2 text-left">
          <label
            htmlFor="username"
            class="text-lightRed uppercase tracking-widest font-light"
          >
            Name
          </label>
          <input
            v-model="name"
            type="text"
            class="rounded-lg text-darkViolet font-semibold text-lg"
            placeholder="Type your name/alias"
            id="username"
            required
          />
        </div>

        <div class="w-full flex flex-col gap-2 text-left">
          <label
            htmlFor="userMessage"
            class="text-lightRed uppercase tracking-widest font-light"
          >
            Message
          </label>
          <textarea
            v-model="message"
            name="userMessage"
            class="rounded-lg text-darkViolet font-semibold text-lg"
            placeholder="Type your message here"
            id="userMessage"
            cols="30"
            required
            rows="2"
          ></textarea>
        </div>
        
        <div class="w-full flex flex-col gap-2 text-left">
          <label
            htmlFor="envelopeAmount"
            class="text-lightRed uppercase tracking-widest font-light"
          >
            Total Pocket Amount
          </label>
          <input
            v-model="totalPocketAmount"
            class="rounded-lg text-darkViolet font-semibold text-lg"
            type="number"
            id="envelopeAmount"
            :placeholder="`Amount in ${currentNetworkSymbol}`"
          />
        </div>
      </section>

      <aside class="flex flex-col justify-between gap-8">
        <div class="w-full flex flex-col gap-2 text-left">
          <label
            htmlFor="maxParticipants"
            class="text-lightRed uppercase tracking-widest font-light"
          >
            Max. Participants
          </label>
          <input
            v-model="maxParticipants"
            class="rounded-lg text-darkViolet font-semibold text-lg"
            type="number"
            id="maxParticipants"
            placeholder="Type your answer here"
          />
        </div>
        <div class="grid grid-cols-3 gap-8">
          <div class="col-span-1">
            <div
              htmlFor="maxParticipants"
              class="text-lightRed uppercase tracking-widest font-light text-left pb-2"
            >
              Network
            </div>
            <select
              class="
                form-select appearance-none
                block
                text-white uppercase tracking-widest font-light
              "
              @change="setSelectedNetwork"
              aria-label="Default select example"
            >
                <option
                  v-for="(element, index) in ToArray(NetworkEnum).filter(element => element !== 'NO_NET')"
                  :selected="currentNetworkId === Number(NetworkEnum[element])"
                  :key="index"
                  :value="NetworkEnum[element]"
                >
                  {{ element }}
                </option>
            </select>
          </div>
  
          <div class="w-full flex flex-col gap-2 text-left col-span-2">
            <label
              htmlFor="userWalletAddress"
              class="text-lightRed uppercase tracking-widest font-light"
            >
              Connected Wallet Address
            </label>
            <div
              class="text-2xl font-bold text-white/80"
            >
              {{ truncateAddress(currentAccount, 18) }}
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col gap-2 text-left">
          <ConnectButton
            v-if="!currentAccount"
            button-class="px-8 py-4 text-xl base-btn"
          />
          <BaseButton
            v-else-if="!isLoading"
            @click="create"
            button-class="px-8 py-4 text-xl base-btn"
            inner-text="Create Red Pocket"
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
      </aside>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseButton from './BaseButton.vue';
import ConnectButton from './ConnectButton.vue';

import { currentAccount, currentNetworkId, switchNetwork, currentNetworkSymbol } from '../composables/useWallet'
import { isOpen } from '../composables/useCreateEnvelopeForm'
import { truncateAddress } from '../utils';
import { createEnvelope, getEnvelopesByAddress } from './../composables/contracts/useEnvelopesContract'

import { NetworkEnum } from '../composables/network.enum'

const router = useRouter()

const isLoading = ref(false)

const name = ref('')
const message = ref('')
const totalPocketAmount = ref(undefined)
const maxParticipants = ref(1)

async function create () {
  isLoading.value = true

  await createEnvelope(
    maxParticipants.value,
    message.value,
    name.value,
    String(totalPocketAmount.value)
  )

  await getEnvelopesByAddress(currentAccount.value)
    .then(res =>{
      router.push({ path: `envelope/${res[res.length - 1].envelopeId}/${currentNetworkId.value}` })
    })
    .finally(() => {
      isLoading.value = false
      isOpen.value = false
      cleanForm()
    })
}

async function setSelectedNetwork (event) {
  await switchNetwork(event.target.value)
    .catch((err) => {
      router.push({ path: `/network-not-found/${event.target.value}` })
      isOpen.value = false
    })
}

// Helper
function ToArray(enumme) {
  const StringIsNumber = value => isNaN(Number(value)) === false;
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map(key => enumme[key]);
}

function cleanForm() {
  name.value = ''
  message.value = ''
  totalPocketAmount.value = undefined
  maxParticipants.value = 1
}

</script>