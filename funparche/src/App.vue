<template>
  <div>
    <MegaMenu :model="items" />
    <router-view />
  </div>
</template>

<script>

export default {
  data () {
    return {
      items: [{ label: 'Home', icon: 'pi pi-home', to: '/' },
        { label: 'crear Evento', icon: 'pi pi-calendar-plus', to: '/crearEvento' },
        { label: 'Encuentra un Evento', icon: 'pi pi-search', to: '/ConsultarEvento' },
        { label: 'About', icon: 'pi pi-info', to: '/About' }]
    }
  }
}
</script>
