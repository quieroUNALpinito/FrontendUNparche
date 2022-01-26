<template>
  <div class="p-m-4">
    <div class="p-grid">
      <div class="p-col">
        <Panel></Panel>
      </div>
    </div>
  </div>
  <div class="p-m-4">
    <DataTable v-if="respuesta.length > 0" :value="respuesta">
      <Column field="Nombre Grupo" header="Nombre del Grupo"></Column>
      <Column field="Descripcion" header="Descripcion"></Column>
      <Column field="Oficial" header="Grupo Oficial"></Column>
    </DataTable>
    <h4 v-else>
      Aún no eres dueño de ningún grupo :c, <a href="/panel/crearGrupo"> crea uno!</a>
    </h4>
  </div>
</template>

<script>
import Panel from '../views/Panel.vue'
import axios from 'axios'
export default {
  components: { Panel },
  data () {
    return {
      nombre: '',
      descripcion: '',
      oficial: [],
      ID: '',
      respuesta: [1],
      nombreGrupo: ''
    }
  },
  methods: {
    loadGrupos: function () {
      console.log('loadGrupos')
      console.log(this.ID)
      axios
        .post('http://localhost:8080/api/grupos/buscarMisGrupos', {
          id_user: this.ID
        })
        .then((response) => {
          // console.log(response.data)
          this.respuesta = response.data
          console.log(this.respuesta)
          // this.respuesta.Oficial = this.respuesta.Oficial ? 'Si' : ' No'
        })
        .catch(function (error) {
          // handle error
          console.log('respuestas')
          console.log(error)
        })
    }
  },
  mounted: function () {
    this.ID = localStorage.getItem('ID')
    this.loadGrupos()
  }
}
</script>

<style></style>
