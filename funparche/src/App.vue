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
        { label: 'UNparche', to: '/' },
        { label: 'Home', icon: 'pi pi-home', to: '/' },
        { label: 'crearEvento', icon: 'pi pi-calendar', to: '/crearEvento' },
        { label: 'About', icon: 'pi pi-info', to: '/About' }
      ]
    }
  }
}
</script>
