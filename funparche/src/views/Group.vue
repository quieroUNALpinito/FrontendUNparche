<template>
  <Dialog :modal="true" v-model:visible="visible">
    <div class="p-grid">
      <div class="p-col-12">
        <h2>Lista de Integrantes</h2>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-6">
            <DataTable
              :value="info"
              paginator="true"
              class="p-datatable-customers"
              :rows="10"
              selectable-key="Nombres"
              item-key="Nombres"
              :rowHover="true"
              v-model:selection="selectedUsers"
            >
              <Column
                selectionMode="multiple"
                headerStyle="width: 3rem"
              ></Column>
              <Column
                field="ID_usuario"
                header="ID_usuario"
                v-if="false"
              ></Column>
              <Column field="Nombres" header="Nombres"></Column>
              <Column field="Apellidos" header="Apellidos"></Column>
              <Column field="ID_permiso" header="Tipo de permiso"></Column>
            </DataTable>
          </div>
          <Button
            label="Cambiar Permiso"
            icon="pi pi-external-link"
            @click="openResponsive"
          />

          <!--<Button
          label="Eliminar Integrante"
          @click="selectUser"
          class="p-button-sm"
        ></Button>-->

          <Button
            label="Confirmar Eliminacion"
            v-if="this.delete == true"
            @click="deleteUser"
            class="p-button-sm"
          ></Button>
          <Dialog
            header="Elegir nuevo Rol"
            v-model:visible="displayResponsive"
            :breakpoints="{ '960px': '75vw' }"
            :style="{ width: '30vw' }"
          >
            <div class="p-field-checkbox">
              <Checkbox id="1" name="permiso" value="1" v-model="permisos" />
              <label for="Administrador">Administrador</label>
            </div>
            <div class="p-field-checkbox">
              <Checkbox id="2" name="permiso" value="2" v-model="permisos" />
              <label for="Miembro">Miembro</label>
            </div>

            <template #footer>
              <Button
                label="No"
                icon="pi pi-times"
                @click="closeResponsive"
                class="p-button-text"
              />
              <Button
                label="Confirmado"
                icon="pi pi-check"
                @click="updatePermiso"
                autofocus
              />
            </template>
          </Dialog>
          <div class="p-grid p-ai-center vertical-container"></div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
export default {
  data () {
    return {
      select: false,
      delete: false,
      checked: false,
      grupo: '',
      info: null,
      selectedUsers: null,
      permisos: [],
      visible: false
    }
  },
  setup () {
    const displayResponsive = ref(false)
    return {
      displayResponsive
    }
  },
  methods: {
    loadMiembros: function () {
      console.log('cargando miembros del grupo')
      axios
        .post('http://localhost:8080/api/grupos/listarMiembros', {
          id_grupo: this.grupo
        })
        .then((response) => {
          console.log(response.data)
          this.info = response.data
          console.log(this.info)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    selectUser: function () {
      this.delete = true
    },
    deleteUser: function () {
      this.delete = false
    },
    changeRole: function () {
      // this.select = true
    },
    openResponsive: function () {
      this.displayResponsive = true
    },
    closeResponsive: function () {
      this.displayResponsive = false
    },
    updatePermiso: function () {
      console.log('actualizando permisos')
      axios
        .post('http://localhost:8080/api/grupos/updatePermiso', {
          permiso: this.permisos[0],
          grupo: this.grupo,
          usuario: this.selectedUsers[0].ID_usuario
        })
        .catch((error) => {
          console.warn(error)
        })
      this.displayResponsive = false
      this.loadMiembros()
    },
    openWindow: function (id) {
      this.grupo = id
      this.loadMiembros()
      this.visible = true
    }
  }
}
</script>
