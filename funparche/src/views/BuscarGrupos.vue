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
    <DataTable v-if="respuesta.length > 0" :value="respuesta">
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
  <div class="p-m-4">
    <div class="p-grid">
      <div class="p-col">
        <h2>Buscar grupos por su nombre</h2>
        <InputText type="text" v-model="nombreGrupo" />
        <Button
          icon="pi pi-search"
          class="p-button-rounded p-button-help"
          @click="buscarPorNombre"
        />
      </div>
    </div>
  </div>
  <div class="p-m-4">
    <DataTable
      v-if="respuestaNombreGrupo.length > 0"
      :value="respuestaNombreGrupo"
    >
      <Column field="Nombre Grupo" header="Nombre del Grupo"></Column>
      <Column field="Descripcion" header="Descripcion"></Column>
      <Column field="Oficial" header="Grupo Oficial"></Column>
      <Column field="Nombres" header="Nombres del Creador"></Column>
      <Column field="Apellidos" header="Apellidos  del Creador"></Column>
      <Column field="NombreCategoria" header="Tipo de Grupo"></Column>
    </DataTable>
    <h4 v-else>
      Lo sentimos no se encontro ningun grupo con el nombre indicado
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
      categorias: null,
      nombre: '',
      descripcion: '',
      oficial: [],
      categoria: null,
      ID: '',
      respuesta: [1],
      nombreGrupo: '',
      respuestaNombreGrupo: [1]
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
    buscarPorNombre: function () {
      console.log(`nombre: ${this.nombreGrupo}`)
      axios
        .post('http://localhost:8080/api/grupos/buscarGruposPorNombre', {
          nombreGrupo: this.nombreGrupo,
          id_user: this.ID
        })
        .then((response) => {
          // console.log(response.data)
          this.respuestaNombreGrupo = response.data
          // this.respuesta.Oficial = this.respuesta.Oficial ? 'Si' : ' No'
          console.log(this.respuestaNombreGrupo)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
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
