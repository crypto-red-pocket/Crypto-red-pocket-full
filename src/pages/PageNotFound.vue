<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">
      <section class="">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
          <div class="pt-32 pb-12 md:pt-64 md:pb-20 text-center">
            <h1 class="h3 font-red-hat-display mb-8">Hm, the page you were looking for doesn't exist anymore.</h1>
            <router-link class="base-btn" to="/">
              <span>Back to Home</span>
            </router-link>
          </div>
        </div>
      </section>

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script>
import Header from './../partials/Header.vue'
import PageIllustration from './../partials/PageIllustration.vue'
import Footer from './../partials/Footer.vue'

export default {
  name: 'Features',
  components: {
    Header,
    PageIllustration,
    Footer,
  },
}
</script>
