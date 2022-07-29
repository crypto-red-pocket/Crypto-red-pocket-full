import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Envelope from './pages/Envelope.vue'
import PageNetworkNotFound from './pages/PageNetworkNotFound.vue'
import PageNotFound from './pages/PageNotFound.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return window.scrollTo({ top: document.querySelector(to.hash).offsetTop - 110, behavior: 'smooth' });
    }

    return { x: 0, y: 0 }
  },
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/envelope/:envelopeId/:networkId',
      component: Envelope
    },
    {
      path: '/network-not-found/:networkId',
      component: PageNetworkNotFound
    },
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFound,
    }
  ]
})

export default router
