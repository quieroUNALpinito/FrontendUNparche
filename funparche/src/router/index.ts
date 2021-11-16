import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import crearEvento from '../views/crearEvento.vue'
import About from '../views/About.vue'
import ConsultarEvento from '../views/ConsultarEvento.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/crearEvento',
    name: 'crearEvento',
    component: crearEvento
  },
  {
    path: '/About',
    name: 'About',
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    
  },
  {
    path: '/ConsultarEvento',
    name: 'ConsultarEvento',
    component: ConsultarEvento
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
