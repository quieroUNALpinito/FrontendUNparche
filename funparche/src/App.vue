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
        { label: 'Crear Grupo', icon: 'pi pi-users', to: '/crearGrupo' },
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

<style>
.menuMainIcon {
  background: url('./assets/logo.png');
}

.textinputs100 {
  width: 100%;
}

.textareas100 {
  width: 100%;
  resize: none;
}

.dropdowns100 {
  width: 100%;
}

.textinputs33 {
  width: 33%;
}

.dropdowns33 {
  width: 33%;
}

.nomargin {
  margin: 0px;
  padding: 0px;
}

.mmenu {
  background: black;
}
</style>
