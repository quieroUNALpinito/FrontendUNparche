import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import crearEvento from '../views/crearEvento.vue'
import About from '../views/About.vue'
<<<<<<< HEAD
<<<<<<< HEAD
=======
import crearEventoBasicos from '../components/crearEventoBasicos.vue'
import crearEventoConfiguracion from '../components/crearEventoConfiguracion.vue'
import crearEventoUbicacion from '../components/crearEventoUbicacion.vue'
import previewEvento from '../components/previewEvento.vue'
>>>>>>> feature/crearEvento
=======
import ConsultarEvento from '../views/ConsultarEvento.vue'
>>>>>>> bfdc22628803334bec41edb951ade76c0768dd50

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/crearEvento',
    name: 'crearEvento',
<<<<<<< HEAD
    component: crearEvento
=======
    component: crearEvento,
    children: [
      {
        path: '',
        component: crearEventoBasicos
      },
      {
        path: 'configuracion',
        component: crearEventoConfiguracion
      },
      {
        path: 'ubicacion',
        component: crearEventoUbicacion
      },
      {
        path: 'confirmacion',
        component: previewEvento
      }
    ]
>>>>>>> feature/crearEvento
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
