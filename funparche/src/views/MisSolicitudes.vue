<template>
  <div class="p-m-4">
    <div class="p-grid">
      <div class="p-col">
        <Panel></Panel>
        <h2>Mis Grupos</h2>
      </div>
    </div>
  </div>
  <div class="p-m-4">
    <DataTable v-if="respuesta.length > 0" :value="respuesta">
      <Column field="Nombres" header="Nombres"></Column>
      <Column field="Apellidos" header="Apellidos"></Column>
      <Column field="NombreGrupo" header="Grupo al que solicita"></Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-check"
            class="p-button-rounded p-button-success p-mr-2"
            @click="respSolicitud(slotProps.data, true)"
          />
          <Button
            icon="pi pi-times"
            class="p-button-rounded p-button-danger"
            @click="respSolicitud(slotProps.data, false)"
          />
        </template>
      </Column>
    </DataTable>
    <h4 v-else>
      No tienes ninguna solicitud pendiente! :D
    </h4>

  </div>
</template>

<script>
import Panel from '../views/Panel.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useToast } from 'primevue/usetoast'

export default {
  components: { Panel },
  data () {
    return {
      ID: '',
      respuesta: [1]
    }
  },
  methods: {
    loadSolicitudes: function () {
      console.log('cargando mis solicitudes')
      axios
        .post('http://localhost:8080/api/grupos/buscarMisSolicitudes', {
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
          console.log(error)
        })
    },
    respSolicitud: function (data, res) {
      console.log(data)
    },
    saveGroup: function () {
      if (!this.categoria) {
        this.$toast.add({ severity: 'warn', summary: 'Categoría del grupo', detail: 'Selecciona una categoría', life: 3000 })
      } else {
        this.group.NombreGrupo = this.NombreGrupo
        this.group.Descripcion = this.Descripcion
        this.group.Privado = this.Privado
        this.group.NombreCategoria = this.categoria.Nombre
        axios
          .post('http://localhost:8080/api/grupos/updateGrupos', {
            group: this.group,
            categoria: this.categoria.ID
          })
          .then((response) => {
            this.$toast.add({ severity: 'success', summary: 'Grupo Modificado', detail: 'Tu grupo se actualizó', life: 3000 })
            this.loadGrupos()
          })
          .catch(function (error) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido modificar el grupo', life: 3000 })
            console.log(error)
          })
      }
      this.loadGrupos()
      this.hideDialog()
    }
  },
  mounted: function () {
    this.ID = localStorage.getItem('ID')
    this.loadSolicitudes()
  }
}
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

.group-image {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .group-image {
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
