import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import crearEvento from '../views/crearEvento.vue'
import About from '../views/About.vue'
import crearEventoBasicos from '../components/crearEventoBasicos.vue'
import crearEventoConfiguracion from '../components/crearEventoConfiguracion.vue'
import crearEventoUbicacion from '../components/crearEventoUbicacion.vue'
import previewEvento from '../components/previewEvento.vue'
import ConsultarEvento from '../views/ConsultarEvento.vue'
import crearGrupo from '../views/crearGrupo.vue'
import LogIn from '../views/LogIn.vue'
import Perfil from '@/views/Perfil.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: LogIn
  },
  {
    path: '/crearEvento',
    name: 'crearEvento',
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
  },
  {
    path: '/About',
    name: 'About',
    component: About
  },
  {
    path: '/consultarEvento',
    name: 'ConsultarEvento',
    component: ConsultarEvento
  },
  {
    path: '/crearGrupo',
    name: 'crearGrupo',
    component: crearGrupo
  },
  {
    path: '/landing',
    name: 'landing',
    component: Home
  },
  {
    path: '/Perfil',
    name: 'EditarPerfil',
    component: Perfil
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
