import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Envelope from './pages/Envelope.vue'
import PageNetworkNotFound from './pages/PageNetworkNotFound.vue'
import PageNotFound from './pages/PageNotFound.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      window.scroll({ top: 0 })
    } else {
      document.querySelector('html').style.scrollBehavior = 'auto'
      window.scroll({ top: 0 })
      document.querySelector('html').style.scrollBehavior = ''
    }
  },
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Home,
      scrollBehavior(to, from, savedPosition) {
          if (savedPosition) {
            return savedPosition;
          }

          if (to.hash) {
            return { el: to.hash };
          }
        return { x: 0, y: 0 }
      }
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
      component: PageNotFound
    }
  ]
})

export default router
