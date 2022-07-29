<template>
  <div class="mx-auto text-center w-2/3 py-24">
    <h2 class="text-4xl text-lightViolet font-semibold">
      A Global Team Of Blockchain Experts!
    </h2>

    <div class="gap-5 py-10 grid lg:grid-cols-5 grid-cols-2">
      <a
        v-for="(participant, index) in participants"
        :href="participant.linkedInUrl"
        :key="index"
        target="_blank"
        class="py-10 rounded-xl w-full  text-lightGrey
        hover:text-lightRed hover:-translate-y-2 ease-in-out duration-300  drop-shadow-lg cursor-pointer"
      >
        <img
          class="h-36 mx-auto hover:scale-125 ease-in-out duration-300"
          :src="participant.img"
          :alt="participant.alt"
        />
        <header class="text-2xl py-5">{{ participant.name }}</header>
        <p class="text-lightGrey">{{ participant.role }}</p>
        <p class="text-lightGrey">{{ participant.country }}</p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const participants = ref([
  {
    name: "Raushan",
    fullName: "Raushan Sharma",
    img: '/images/person1.png',
    alt: 'Team1',
    role: "Front-end developer",
    country: "India",
    linkedInUrl: "https://www.linkedin.com/in/raushansharma/",
  },
  {
    name: "Elad",
    fullName: "Elad Mintzer",
    img: '/images/person2.png',
    alt: 'Team2',
    role: "Business",
    country: "UK",
    linkedInUrl: "https://www.linkedin.com/in/eladmi/",
  },
  {
    name: "Shalu",
    fullName: "Shalu Panwar",
    img: '/images/personFemale4.png',
    alt: 'Team4',
    role: "Smart contract developer",
    country: "India",
    linkedInUrl: "https://www.linkedin.com/in/shalupanwar/",
  },
  {
    name: "David",
    fullName: "Juan David Polanco Rojas",
    img: '/images/person2.png',
    alt: 'Team3',
    role: "Smart contract developer",
    country: "Spain",
    linkedInUrl:
      "https://www.linkedin.com/in/juan-david-polanco-rojas-6a06aa12a/",
  },
  {
    name: "Enrique",
    fullName: "Enrique Peña",
    img: '/images/person5.png',
    alt: 'Team5',
    role: "Full Stack developer",
    country: "Colombia",
    linkedInUrl: "https://www.linkedin.com/in/enpepolicy/",
  }
])

</script>