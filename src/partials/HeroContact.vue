<template>
  <div class="mx-auto text-center w-2/3 pb-10">
    <div class="flex text-left items-center">
      <div class="flex flex-1 flex-col justify-start">
        <h2 class="text-4xl text-lightViolet font-semibold pb-5">
          Create An Envelope!
        </h2>
        <p class="text-lightGrey pb-5">
          The crypto inside the packet will be distributed to limited amount of winners defined by packet creator.
        </p>

        <ConnectButton
          v-if="!currentAccount"
          button-class="px-8 py-4 text-xl base-btn"
        />
        <BaseButton
          v-else-if="!isLoading"
          @click="create"
          button-class="px-8 py-4 text-xl base-btn"
          inner-text="Create Red Packet"
        />
      </div>
      <div class="flex flex-1">
        <img class="" src="/images/envelop-illustration.svg" alt="Envelope Image" />
        <a
          class="hidden"
          href="https://www.freepik.com/vectors/email-notification"
        >
          Email notification vector created by upklyak - www.freepik.com
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isOpen } from './../composables/useCreateEnvelopeForm'
import { currentAccount } from './../composables/useWallet'
import ConnectButton from './ConnectButton.vue';
import BaseButton from './BaseButton.vue';

import { ref } from 'vue'

const isLoading = ref(false)

async function create () {
  isOpen.value = true
}
</script>