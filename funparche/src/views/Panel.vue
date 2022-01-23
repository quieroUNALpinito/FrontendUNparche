<template>
  <div>
    <h1>Panel</h1>
    <TabMenu :model="items" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: [
        {
          label: 'Buscar Grupos',
          icon: 'pi pi-search',
          to: '/panel/buscarGrupos'
        },
        { label: 'Crear Grupo', icon: 'pi pi-pencil', to: '/panel/crearGrupo' },
        { label: 'Administrar Grupos', icon: 'pi pi-cog' }
      ]
    }
  }
}
</script>
