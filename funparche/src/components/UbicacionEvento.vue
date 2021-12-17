<template>
  <div>
    <Button label="Ver Mapa" icon="pi pi-external-link" @click="openResponsive" />
    <Dialog header="Consultar Evento por Ubicación" v-model:visible="displayResponsive" :breakpoints="{'960px': '75vw'}" :style="{width: '50vw'}">
      <GoogleMap
        api-key="Aqui va la API Key!!"
        style="width: 100%; height: 500px"
        :center="center"
        :zoom="16"
      >
      </GoogleMap>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" @click="closeResponsive" class="p-button-text"/>
            <Button label="Buscar" icon="pi pi-search" @click="closeResponsive" autofocus />
        </template>
    </Dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { GoogleMap } from 'vue3-google-map'

export default {
  name: 'UbicacionEvento',
  components: {
    GoogleMap
  },
  setup () {
    const displayResponsive = ref(false)

    const openResponsive = () => {
      displayResponsive.value = true
    }
    const closeResponsive = () => {
      displayResponsive.value = false
    }

    const center = { lat: 4.6365772, lng: -74.0825521 }
    return {
      displayResponsive,
      openResponsive,
      closeResponsive,
      center
    }
  }
}
</script>
