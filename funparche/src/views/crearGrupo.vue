<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">
        <h5>Crea tu propio grupo :)</h5>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-6">
            <label for="name">Nombre</label>
            <InputText id="name" v-model="nombre" type="text" />
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="grimage">Imagen del Grupo (URL)</label>
            <InputText id="grimage" v-model="imagen" type="text" />
          </div>
          <div class="p-field p-col-12">
            <label for="description">Descripción</label>
            <TextArea id="description" v-model="descripcion" rows="4" />
          </div>
          <div class="p-field-checkbox p-col-12 p-md-3">
            <Checkbox name="oficial" value="Oficial" v-model="oficial" />
            <label for="caracter">Es un evento oficial?</label>
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="types">Categoría Grupo</label>
            <Dropdown
              id="types"
              v-model="categoria"
              :options="categorias"
              optionLabel="Nombre"
              placeholder="Selecciona una Categoría"
            ></Dropdown>
          </div>
          <div class="p-field p-col-12 p-md-6 center">
            <div class="p-col-6">
              <Button label="Crear Grupo" @click="loadGrupo"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useToast } from 'primevue/usetoast'

export default {
  setup () {
    const toast = useToast()
  },
  data () {
    return {
      categorias: null,
      nombre: '',
      descripcion: '',
      oficial: [],
      categoria: null
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
    loadGrupo: function () {
      console.log('enviando grupo')
      let isOficial = false
      if (this.oficial[0]) {
        isOficial = true
      }
      console.log(this.oficial)
      console.log('asdfsadf')
      axios
        .post('http://localhost:8080/api/grupos/crearGrupo', {
          nombre: this.nombre,
          descripcion: this.descripcion,
          oficial: isOficial,
          categoriaGrupo: this.categoria.ID
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
    }
  },
  mounted: function () {
    this.loadCategorias()
  }
}
</script>

<style lang="scss" scoped>
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
