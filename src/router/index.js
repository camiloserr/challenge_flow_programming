import { createRouter, createWebHashHistory } from 'vue-router'
import Program from '../components/Program.vue'
import LandingPage from '../components/LandingPage.vue'

const routes = [
  {
    path: '/program/:uid',
    name: 'Program',
    component: Program
  },
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
