<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">
        <h5>Crea tu propio grupo :)</h5>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-6">
            <label for="name">Nombre</label>
            <InputText id="name" type="text" />
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="grimage">Imagen del Grupo (URL)</label>
            <InputText id="grimage" type="text" />
          </div>
          <div class="p-field p-col-12">
            <label for="description">Descripción</label>
            <TextArea id="description" rows="4" />
          </div>
          <div class="p-field-checkbox p-col-12 p-md-3">
            <Checkbox name="oficial" value="Oficial" v-model="cities" />
            <label for="caracter">Es un evento oficial?</label>
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="type">Categoría Grupo</label>
            <Dropdown
              id="state"
              v-model="dropdownItem"
              :options="dropdownItems"
              optionLabel="name"
              placeholder="Selecciona una Categoría"
            ></Dropdown>
          </div>
          <div class="p-field p-col-12 p-md-6 center">
            <div class="p-col-6">
              <Button label="Crear Grupo"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data () {
    return {
      dropdownItems: [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
      ],
      dropdownItem: null,
      cities: []
    }
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
