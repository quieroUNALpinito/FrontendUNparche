<template>
  <div>
    <Button label="Ver Mapa" icon="pi pi-external-link" @click="openResponsive" />
    <Dialog header="Consultar Evento por Ubicación" v-model:visible="displayResponsive" :breakpoints="{'960px': '75vw'}" :style="{width: '50vw'}">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" @click="closeResponsive" class="p-button-text"/>
            <Button label="Buscar" icon="pi pi-search" @click="closeResponsive" autofocus />
        </template>
    </Dialog>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'UbicacionEvento',
  setup () {
    const displayResponsive = ref(false)

    const openResponsive = () => {
      displayResponsive.value = true
    }
    const closeResponsive = () => {
      displayResponsive.value = false
    }

    return {
      displayResponsive,
      openResponsive,
      closeResponsive
    }
  }
}
</script>
