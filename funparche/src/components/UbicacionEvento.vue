<template>
  <div>
    <Button label="Ver Mapa" icon="pi pi-external-link" @click="openResponsive" />
    <Dialog header="Consultar Evento por Ubicación" v-model:visible="displayResponsive" :breakpoints="{'960px': '75vw'}" :style="{width: '50vw'}">
      <Fieldset :legend="edificio">
        <GoogleMap
          api-key=process.ENV.api-key
          style="width: 100%; height: 500px;"
          :center="center"
          :zoom="16"
        >
          <div :key="ed.Edificio" v-for="ed in edificios">
            <Marker @click="onMarkerClick(ed.Edificio)" :options="{position: { lat: ed.Coordenadas.x, lng: ed.Coordenadas.y}, title: ed.Edificio}"/>
          </div>
        </GoogleMap>
      </Fieldset>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" @click="closeResponsive" class="p-button-text"/>
            <Button label="Buscar" icon="pi pi-search" @click="onSearch" autofocus />
        </template>
    </Dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

export default {
  name: 'UbicacionEvento',
  data () {
    return {
      edificios: null,
      edificio: ''
    }
  },
  components: {
    GoogleMap,
    Marker
  },
  methods: {
    loadEdificiosOficiales: function () {
      console.log('cargando edificios oficiales')
      axios
        .get('http://localhost:8080/api/recursos/edificiosLugaresOfUbicacion')
        .then((response) => {
          this.edificios = response.data.data
          console.log(this.edificios, 'response')
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    onMarkerClick: function (edificio) {
      this.edificio = edificio
    },
    onSearch: function () {
      this.$emit('search', this.edificio)
      this.closeResponsive()
    }
  },
  setup () {
    const displayResponsive = ref(false)

    const openResponsive = () => {
      displayResponsive.value = true
    }
    const closeResponsive = () => {
      displayResponsive.value = false
      this.edificio = 'Selecciona un lugar'
    }

    const center = { lat: 4.6365772, lng: -74.0825521 }

    return {
      displayResponsive,
      openResponsive,
      closeResponsive,
      center
    }
  },
  mounted: function () {
    this.loadEdificiosOficiales()
    this.edificio = 'Selecciona un lugar'
  }
}
</script>
