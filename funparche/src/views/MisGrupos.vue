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
      <Column field="NombreGrupo" header="Nombre del Grupo"></Column>
      <Column field="Descripcion" header="Descripcion"></Column>
      <Column field="NombreCategoria" header="Categoria"></Column>
      <Column field="Oficial" header="Grupo Oficial"></Column>
      <Column field="Privado" header="Privacidad"></Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editGrupo(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
    <h4 v-else>
      Aún no eres dueño de ningún grupo :c,
      <a href="/panel/crearGrupo"> crea uno!</a>
    </h4>

    <Dialog
      v-model:visible="groupDialog"
      :style="{ width: '450px' }"
      header="Editar Grupo"
      :modal="true"
      class="p-fluid"
    >
      <img src="https://i.picsum.photos/id/985/200/100.jpg?hmac=9wEJ-NV4ZYprH59mmRRU9bdXg602j-nnci2K4WZUkvQ" :alt="group.NombreGrupo" class="group-image"/>
      <div class="field p-mt-3">
        <label for="name">Nombre</label>
        <InputText
          id="name"
          v-model="NombreGrupo"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !group.NombreGrupo }"
        />
        <small class="p-error" v-if="submitted && !group.NombreGrupo"
          >Se requiere un Nombre</small
        >
      </div>

      <div class="field p-mt-3">
        <label for="description">Descripción</label>
        <TextArea
          v-model="Descripcion"
          class="textareas100"
          rows="3"
          cols="20"
        />
      </div>
      <div class="p-mt-3">
        <label for="types">Categoría Grupo</label>
        <Dropdown
          id="types"
          v-model="categoria"
          :options="categorias"
          optionLabel="Nombre"
          placeholder="Selecciona una Categoría"
        ></Dropdown>
      </div>

      <div class="p-mt-3">
        <label for="types">Privacidad del Grupo</label>
        <SelectButton v-model="Privado" :options="privacidad"/>
      </div>

      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveGroup"
        />
      </template>
    </Dialog>
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
      categoria: null,
      categorias: null,
      Privado: '',
      privacidad: ['Privado', 'Público'],
      oficial: [],
      ID: '',
      respuesta: [1],
      NombreGrupo: '',
      Descripcion: '',
      group: ref(),
      groupDialog: ref(false)
    }
  },
  methods: {
    loadGrupos: function () {
      console.log('cargando mis grupos')
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
          console.log(error)
        })
    },
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
    editGrupo: function (data) {
      this.group = data
      this.NombreGrupo = this.group.NombreGrupo
      this.Descripcion = this.group.Descripcion
      this.Privado = this.group.Privado
      this.groupDialog = true
      console.log(data)
    },
    hideDialog: function () {
      this.groupDialog = false
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
    this.loadCategorias()
    this.ID = localStorage.getItem('ID')
    this.loadGrupos()
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
