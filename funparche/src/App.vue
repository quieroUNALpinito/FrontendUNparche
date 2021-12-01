<template>
  <div>
    <Toast />
    <MegaMenu :model="items" v-if="this.path != '/' && this.path != ''" />
    <router-view />
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
export default {
  data () {
    return {
      route: useRoute(),
      path: computed(() => this.route.path),
      router: useRouter(),
      items: [
        { label: 'UNparche', to: '/landing', icon: '/assets/logo.png' },
        {
          label: 'Crear Evento',
          icon: 'pi pi-calendar-plus',
          to: '/crearEvento'
        },
        {
          label: 'Consultar Evento',
          icon: 'pi pi-search',
          to: '/consultarEvento'
        },
        { label: 'About', icon: 'pi pi-info', to: '/About' },
        {
          label: 'Log Out',
          icon: 'pi pi-power-off',
          command: () => {
            this.doLogOut()
          }
        }
      ]
    }
  },
  name: 'App',
  methods: {
    doLogOut: function () {
      this.router.push('/')
      localStorage.clear()
    }
  }
}
</script>
