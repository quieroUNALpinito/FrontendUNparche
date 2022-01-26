<template>
  <Menu :model="items" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Home from '../views/Home.vue'

@Options({
  data () {
    return {
      items: [
        {
          label: 'Bienvendo!',
          items: [
            {
              label: 'Crea un evento',
              icon: 'pi pi-calendar-plus',
              to: '/crearEvento'
            },
            {
              label: 'Busca un evento',
              icon: 'pi pi-search',
              to: 'views/ConsultarEvento'
            }
          ]
        },
        {
          label: 'Tus Grupos',
          items: [
            {
              label: 'Grupo 1',
              icon: 'pi pi-user',
              to: 'views/Group'
            }
          ]
        }
      ]
    }
  },
  components: {
    Home
  }
})
export default class SideMenu extends Vue {}
</script>
