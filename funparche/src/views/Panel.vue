<template>
  <div>
    <h1>Panel de Grupos</h1>
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
        { label: 'Mis Grupos', icon: 'pi pi-user-plus', to: '/panel/misGrupos' }
      ]
    }
  }
}
</script>
