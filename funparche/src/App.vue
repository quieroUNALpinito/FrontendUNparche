<template>
  <div>
    <Toast />
    <MegaMenu :model="items" />
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { label: 'UNparche', to: '/', icon: '/assets/logo.png' },
        { label: 'Crear Evento', icon: 'pi pi-calendar-plus', to: '/crearEvento' },
        { label: 'Consultar Evento', icon: 'pi pi-search', to: '/consultarEvento' },
        { label: 'Perfil', to: '/Perfil' },
        { label: 'About', icon: 'pi pi-info', to: '/About' }
      ]
    }
  }
}
</script>
