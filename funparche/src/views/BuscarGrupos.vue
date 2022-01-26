<template>
  <div class="p-m-4">
    <div class="p-grid">
      <div class="p-col">
        <Panel></Panel>
        <h2>Buscar grupos por categorias</h2>
        <Dropdown
          id="types"
          v-model="categoria"
          :options="categorias"
          optionLabel="Nombre"
          placeholder="Selecciona una Categoría"
        />
        <Button
          icon="pi pi-search"
          class="p-button-rounded p-button-help"
          @click="buscar"
        />
      </div>
    </div>
  </div>
  <div class="p-m-4">
    <DataTable
      v-if="respuesta.length > 0"
      :value="respuesta"
      v-model:selection="seleccionado"
      selectionMode="single"
      label="confirm"
      @rowSelect="onRowSelect"
      @rowUnselect="onRowUnselect"
      responsiveLayout="scroll"
    >
      <Column field="NombreGrupo" header="Nombre del Grupo"></Column>
      <Column field="Descripcion" header="Descripcion"></Column>
      <Column field="Oficial" header="Grupo Oficial"></Column>
      <Column field="Nombres" header="Nombre del Creador"></Column>
      <Column field="Apellidos" header="Apellido  del Creador"></Column>
    </DataTable>
    <h4 v-else>
      Lo sentimos no se encontro ningun grupo por este tipo de categoria
    </h4>
  </div>
  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import Panel from '../views/Panel.vue'
import axios from 'axios'
export default {
  components: { Panel },
  data () {
    return {
      categorias: null,
      nombre: '',
      descripcion: '',
      oficial: [],
      categoria: null,
      ID: '',
      respuesta: [1],
      seleccionado: null,
      id_grupo: null,
      solicitud: null
    }
  },
  methods: {
    loadCategorias: function () {
      console.log('cargando categorias de grupo')
      axios
        .get('http://localhost:8080/api/grupos/verGrupos')
        .then((response) => {
          this.categorias = response.data.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    buscar: function () {
      console.log(`categorias: ${this.categoria.Nombre} `)
      axios
        .post('http://localhost:8080/api/grupos/buscarGrupos', {
          categoria: this.categoria.Nombre,
          id_categoria: this.categoria.ID,
          id_user: this.ID
        })
        .then((response) => {
          // console.log(response.data)
          this.respuesta = response.data
          // this.respuesta.Oficial = this.respuesta.Oficial ? 'Si' : ' No'
          console.log(this.respuesta)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    async onRowSelect (event) {
      await axios
        .post('http://localhost:8080/api/grupos/verificarSolicitud', {
          id_grupo: this.seleccionado.ID,
          id_user: this.ID
        })
        .then((response) => {
          // console.log(response.data)
          this.solicitud = response.data
          // this.respuesta.Oficial = this.respuesta.Oficial ? 'Si' : ' No'
          console.log(this.solicitud)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
      if (this.solicitud.data.length === 0) {
        this.$confirm.require({
          message: 'Quieres unirte a ' + event.data.NombreGrupo + ' ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Enviar solicitud',
          accept: () => {
            this.enviarSolicitud(event)
            this.solicitud = null
          },
          reject: () => {
            this.solicitud = null
          }
        })
      } else {
        this.$confirm.require({
          message: 'Ya enviaste tu solicitud',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Ok',
          accept: () => {
            this.solicitud = null
          },
          reject: () => {
            this.solicitud = null
          }
        })
      }
    },
    enviarSolicitud: async function (event) {
      await axios
        .post('http://localhost:8080/api/grupos/solicitarMembresia', {
          id_grupo: this.seleccionado.ID,
          id_user: this.ID
        })
        .then((response) => {
          this.$toast.add({
            severity: response.data.status,
            detail: response.data.message
          })
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
      this.buscar()
    },
    onRowUnselect (event) {
      this.$toast.add({
        severity: 'warn',
        summary: 'Product Unselected',
        detail: 'Name: ' + event.data.NombreGrupo,
        life: 3000
      })
    }
  },
  mounted: function () {
    this.loadCategorias()
    this.ID = localStorage.getItem('ID')
  }
}
</script>

<style></style>
