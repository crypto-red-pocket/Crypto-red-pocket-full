<template>
  <header class="w-full z-30 text-white font-light bg-transparent top-0 fixed backdrop-blur-md">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class=" flex justify-between py-5 items-center border-b-2 border-lightRed/10">
        <div class="font-inter font-bold text-2xl cursor-pointer">
          <router-link to="/">
            <span class="text-lightRed">Red</span>
            <span class="text-lightViolet">Pocket_</span>
          </router-link>
        </div>
  
        <!-- Desktop Menu -->
        <aside class="hidden md:flex gap-10 text-lg">
          <div
            @click="switchNetwork(44787)"
            class="hover:text-lightViolet my-auto hover:scale-105 cursor-pointer"
          >
            Connec
          </div>
          <div class="hover:text-lightViolet my-auto hover:scale-105 cursor-pointer">
            <router-link
              to="/"
            >
              About
            </router-link>
          </div>
          <div class="hover:text-lightViolet my-auto hover:scale-105 cursor-pointer">
            <router-link
              to="/"
            >
              Team
            </router-link>
          </div>
          <div class="hover:text-lightViolet my-auto hover:scale-105 cursor-pointer">
            <router-link
              to="/"
            >
              Contact
            </router-link>
          </div>
          <div class="hover:text-lightViolet my-auto">
            <ConnectButton
              v-if="!currentAccount"
              button-class="py-2 text-lg base-btn"
            />
          </div>
        </aside>

        <!-- Mobile menu -->
        <div class="inline-flex md:hidden">
          <!-- Hamburger button -->
          <button class="hamburger" ref="hamburger" :class="{ active: mobileNavOpen }" aria-controls="mobile-nav" :aria-expanded="mobileNavOpen" @click="mobileNavOpen = !mobileNavOpen">
            <span class="sr-only">Menu</span>
            <svg class="w-6 h-6 fill-current text-gray-900 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect y="4" width="24" height="2" rx="1" />
              <rect y="11" width="24" height="2" rx="1" />
              <rect y="18" width="24" height="2" rx="1" />
            </svg>
          </button>

          <!-- Mobile navigation -->
          <transition
            enter-active-class="transition ease-out duration-200 transform"
            enter-from-class="opacity-0 -translate-x-full"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition ease-out duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <nav v-show="mobileNavOpen" id="mobile-nav" ref="mobileNav" class="fixed top-0 h-screen z-20 left-0 w-full max-w-md -ml-16 overflow-scroll bg-white dark:bg-gray-900 shadow-lg no-scrollbar">
              <div class="py-5 pr-4 pl-20">
                <!-- Logo -->
                <div class="font-inter font-bold text-2xl cursor-pointer">
                  <div>
                    <span class="text-lightRed">Red</span>
                    <span class="text-lightViolet">Pocket_</span>
                  </div>
                </div>
                <!-- Links -->
                <ul>
                  <div class="hover:text-lightViolet my-auto hover:scale-105 cursor-pointer py-4">
                    <router-link
                      to="/"
                    >
                      About
                    </router-link>
                  </div>
                  <div class="hover:text-lightViolet my-auto hover:scale-105 cursor-pointer pb-4">
                    <router-link
                      to="/"
                    >
                      Team
                    </router-link>
                  </div>
                  <div class="hover:text-lightViolet my-auto hover:scale-105 cursor-pointer pb-4">
                    <router-link
                      to="/"
                    >
                      Contact
                    </router-link>
                  </div>
                  <div class="hover:text-lightViolet my-auto py-4">
                    <ConnectButton
                      v-if="!currentAccount"
                      button-class="px-8 py-4 text-sm base-btn"
                    />
                  </div>
                </ul>
              </div>
            </nav>
          </transition>

        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Dropdown from './../utils/Dropdown.vue'
import ConnectButton from './ConnectButton.vue';
import { switchNetwork } from '../composables/useWallet'

export default {
  name: 'Header',
  components: {
    Dropdown,
    ConnectButton,
  },
  data: function () {
    return {
      mobileNavOpen: false,
      darkMode: this.handleLights()
    }
  },
  methods: {
    switchNetwork,
    clickOutside(e) {
      if (!this.mobileNavOpen || this.$refs.mobileNav.contains(e.target) || this.$refs.hamburger.contains(e.target)) return
      this.mobileNavOpen = false
    },
    keyPress() {
      this.mobileNavOpen = false
    },
		handleLights: function() {
			const dark = localStorage.getItem('dark-mode')
			if (dark === null) {
				return true
			} else {
				return dark === 'true'
			}
		}
  },
	watch: {
		darkMode() {
      localStorage.setItem('dark-mode', this.darkMode)
      if (this.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
		}
	},
  mounted() {
    document.addEventListener('click', this.clickOutside)    
    document.addEventListener('keydown', this.keyPress)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.clickOutside)
  }
};
</script>