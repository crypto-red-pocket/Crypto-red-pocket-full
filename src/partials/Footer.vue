<template>
  <footer class="relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="py-12 md:py-16 border-t border-gray-200 dark:border-gray-800 -mt-px">

        <!-- Footer illustration -->
        <div class="pointer-events-none -z-1" aria-hidden="true">
          <svg class="absolute bottom-0 left-0 transform -translate-x-1/2 ml-24 dark:opacity-40" width="800" height="264" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="400" r="400" fill="url(#footerglow_paint0_radial)" fill-opacity=".4" />
            <defs>
              <radialGradient id="footerglow_paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 0 400) scale(315.089)">
                <stop stop-color="#3ABAB4" />
                <stop offset="1" stop-color="#3ABAB4" stop-opacity=".01" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <!-- Top area: Blocks -->
        <div class="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">

          <!-- 1st block -->
          <div class="md:col-span-2 lg:col-span-3">
            <!-- Logo -->
            <router-link class="inline-block" to="/" aria-label="Cruip">
              <div>
                <span class="text-lightRed">Red</span>
                <span class="text-lightViolet">Packet_</span>
              </div>
            </router-link>
          </div>

          <!-- 2nd, 3rd, 4th and 5th blocks -->
          <div class="md:col-span-10 lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">

            <!-- 2nd block -->
            <div class="text-sm hidden md:flex">
            </div>

            <div class="text-sm">
              <h6 class="font-medium uppercase mb-2">Contract</h6>
              <ul>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" :href="`https://rinkeby.etherscan.io/address/${contractAddressList[NetworkEnum.RINKEBY]}`">Rinkeby</a>
                </li>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" :href="`https://mumbai.polygonscan.com/address/${contractAddressList[NetworkEnum.MUMBAI]}`">Polygon</a>
                </li>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" :href="`https://neonscan.org/address/${contractAddressList[NetworkEnum.NEON]}`">Neon</a>
                </li>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" :href="`https://rinkeby.etherscan.io/address/${contractAddressList[NetworkEnum.CRONOS]}`">Cronos</a>
                </li>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" :href="`https://alfajores-blockscout.celo-testnet.org/address/${contractAddressList[NetworkEnum.CELO]}`">Celo</a>
                </li>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" :href="`https://blockscout.com/xdai/optimism/address/${contractAddressList[NetworkEnum.GNOSIS]}`">Gnosis</a>
                </li>
              </ul>
            </div>

            <!-- 3rd block -->
            <div class="text-sm">
              <h6 class="font-medium uppercase mb-2">Team Members</h6>
              <ul>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" href="https://www.linkedin.com/in/enpepolicy/">Enrique Peña</a>
                </li>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" href="https://www.linkedin.com/in/juan-david-polanco-rojas-6a06aa12a/">Juan David Polanco</a>
                </li>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" href="https://www.linkedin.com/in/shalupanwar/">Shalu Panwar</a>
                </li>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" href="https://www.linkedin.com/in/raushansharma/">Raushan Sharma</a>
                </li>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" href="https://www.linkedin.com/in/eladmi/">Elad Mintzer</a>
                </li>
              </ul>
            </div>

            <!-- 4th block -->
            <div class="text-sm">
              <h6 class="font-medium uppercase mb-2">Hackaton</h6>
              <ul>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" href="https://ethcchack2022.devpost.com/">Prizes</a>
                </li>
                <li class="mb-1">
                  <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" target="_blank" href="https://ethcchack2022.devpost.com/rules">Rules</a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <!-- Bottom area -->
        <div class="md:flex md:items-center md:justify-between">

          <!-- Social links -->
          <ul class="flex mb-4 md:order-2 md:ml-4 md:mb-0">
            <li class="ml-4">
              <a class="flex justify-center items-center text-white bg-lightViolet hover:underline hover:bg-lightRed rounded-full transition duration-150 ease-in-out" href="https://github.com/crypto-red-pocket/Crypto-red-pocket-full" target="_blank" aria-label="Github">
                <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                </svg>
              </a>
            </li>
          </ul>

          <!-- Copyrights note -->
          <div class="text-gray-600 dark:text-gray-400 text-sm mr-4">&copy; 2022 Red Packet. All rights reserved.</div>

        </div>

      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NetworkEnum } from '../composables/network.enum' 
import addressList from '../../contract-addresses.json'

const contractAddressList = ref(addressList)
</script>
