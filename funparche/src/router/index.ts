import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import crearEvento from '../views/crearEvento.vue'
import About from '../views/About.vue'
import ConsultarEvento from '../views/ConsultarEvento.vue'
import crearGrupo from '../views/crearGrupo.vue'
import LogIn from '../views/LogIn.vue'
import Perfil from '@/views/Perfil.vue'
import App from '@/App.vue'
import Group from '../views/Group.vue'
import Panel from '@/views/Panel.vue'
import BuscarGrupos from '@/views/BuscarGrupos.vue'
import MisGrupos from '../views/MisGrupos.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: LogIn
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
  },
  {
    path: '/panel/buscarGrupos',
    name: 'buscarGrupos',
    component: BuscarGrupos
  },
  {
    path: '/consultarEvento',
    name: 'ConsultarEvento',
    component: ConsultarEvento
  },
  {
    path: '/panel/crearGrupo',
    name: 'crearGrupo',
    component: crearGrupo
  },
  {
    path: '/panel/misGrupos',
    name: 'misGrupos',
    component: MisGrupos
  },
  {
    path: '/landing',
    name: 'landing',
    component: Home
  },
  {
    path: '/panel',
    name: 'PanelUsuario',
    component: Panel
  },
  {
    path: '/Perfil',
    name: 'EditarPerfil',
    component: Perfil
  },
  {
    path: '/Group',
    name: 'Group',
    component: Group
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
