<template>
  <section class="border-t border-transparent dark:border-gray-800">
    <div
      class="py-12 md:py-20"
    >

      <div
        v-if="showInfo"
        class="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <!-- Section header -->
        <div class="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h1 class="h2 font-red-hat-display mb-4">Unique utilty NFT collection that supports people's health harm reduction</h1>
          <p class="text-xl text-gray-600 dark:text-gray-400">Generate a traceability of pills using blockchain technology around the world, leading to better decision-making for consumers over their health, and get an unique NFT in the process that gives you access to VIP lounge places in festivals and events.</p>
        </div>

      </div>
      
      <div
        v-else
        class="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <!-- Section header -->
        <div class="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h1 class="h2 font-red-hat-display mb-4 text-center">Your NFT's</h1>
        </div>

      </div>

      <!-- Carousel built with Swiper.js [https://swiperjs.com/] -->
      <!-- * Custom styles in src/css/additional-styles/theme.scss -->
      <div 
        v-if="props.pills[0]"
        class="carousel swiper-container"
      >
        <div class="swiper-wrapper">
          <!-- Carousel items -->
          <div
            v-for="(item, index) in formattedPills"
            :key="index"
            class="swiper-slide max-w-lg"
          >
            <img
              class="transition-opacity duration-300"
              :src="item.image"
              width="540"
              height="540"
              alt="Carousel item 01"
            />
            <div class="absolute inset-0 flex flex-col transition-opacity duration-300 translate-z-0">
              <div class="absolute bottom-0 right-0 p-6">
                <a :href="item.openSeaUrl" target="_blank" class="text-xs font-medium text-center text-white py-2 px-3 rounded-full bg-gray-900 bg-opacity-50 hover:bg-opacity-100 transition duration-150 ease-in-out">See NFT #{{ item.token_id }} in OpenSea</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="text-center text-5xl pt-56 font-bold text-white/40">
          NO NFT MINTED
        </div>
      </div>

      <!-- Arrows -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between mt-12 md:mt-16">
          <button class="carousel-prev relative z-20 w-12 h-12 p-1 box-content flex items-center justify-center group bg-teal-500 hover:bg-teal-400 dark:bg-gray-800 dark:hover:bg-teal-500 dark:hover:bg-opacity-25 shadow-xl transition duration-150 ease-in-out">
            <span class="sr-only">Previous</span>
            <svg class="w-4 h-4 fill-current text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-teal-500 transition duration-150 ease-in-out" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
            </svg>
          </button>
          <button class="carousel-next relative z-20 w-12 h-12 p-1 box-content flex items-center justify-center group bg-teal-500 hover:bg-teal-400 dark:bg-gray-800 dark:hover:bg-teal-500 dark:hover:bg-opacity-25 shadow-xl transition duration-150 ease-in-out">
            <span class="sr-only">Next</span>
            <svg class="w-4 h-4 fill-current text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-teal-500 transition duration-150 ease-in-out" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, PropType, computed } from 'vue';
import Swiper, { Autoplay, Navigation } from 'swiper'
import 'swiper/swiper-bundle.css'
Swiper.use([Autoplay, Navigation])

onMounted(() => {
  new Swiper('.carousel', {
    slidesPerView: 'auto',
    grabCursor: true,
    // loop: true,
    centeredSlides: true,
    initialSlide: 1,
    spaceBetween: 24,
    // autoplay: {
    //   delay: 7000,
    // },
    navigation: {
      nextEl: '.carousel-next',
      prevEl: '.carousel-prev',
    },
  })
})

const props = defineProps({
  showInfo: {
    type: Boolean,
    default: true,
  },
  pills: {
    type: Array as PropType<Array<{token_id: number; token_address: string; metadata: string}>>,
    default: () => [
      // {
      //   token_address: "0xeb3bc5a7ad9209576f03dedc7e4c055e04ec3723",
      //   token_id: 1,
      //   metadata: "{\"description\":\"Support people's health harm reduction by minting a unique NFT that helps alert adulterated MDMA (Ecstasy) in festivals and events\",\"external_url\":\"https://famous-raindrop-74145c.netlify.app/nft-collection\",\"image\":\"https://gateway.pinata.cloud/ipfs/QmTuxXq8GWWdFbji3nG3oHfL92nPwkdicvvfps7aSx6BJE/1.png\",\"name\":\"Ecstasy Pill #1\",\"attributes\":[{\"trait_type\":\"Pill\",\"value\":\"MDMA\"},{\"trait_type\":\"Form\",\"value\":\"Skull\"}]}"
      // }
    ]
  },
})

const formattedPills = computed((): Array<any> => {  
  return props.pills.map(item => {
    return {
      token_id: item.token_id,
      image: JSON.parse(item.metadata)?.image || './no_photo.png',
      openSeaUrl: `https://testnets.opensea.io/assets/rinkeby/${item.token_address}/${item.token_id}`
    }
  }).sort(function(a, b) {
  return a.token_id - b.token_id;
});
})
</script>