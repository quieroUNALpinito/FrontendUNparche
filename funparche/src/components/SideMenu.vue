<template>
    <Menu :model="items" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  data () {
    return {
      items: [
        {
          label: 'Bienvendo!',
          items: [
            {
              label: 'Crea un evento',
              icon: 'pi pi-calendar-plus'
            },
            {
              label: 'Busca un evento',
              icon: 'pi pi-search'
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
            },
            {
              label: 'Grupo 2',
              icon: 'pi pi-user'
            },
            {
              label: 'Grupo 3',
              icon: 'pi pi-user'
            }
          ]
        }
      ]
    }
  }
})
export default class SideMenu extends Vue {}
</script>
