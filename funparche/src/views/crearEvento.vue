<template>
  <div>
    <h1>Nuevo Evento</h1>
    <Steps :model='items' />
  </div>
</template>

<script>

export default {
  data () {
    return {
      items: [{ label: 'Home', icon: 'pi pi-home', to: '/' },
        { label: 'crearEvento', icon: 'pi pi-calendar', to: '/crearEvento' },
        { label: 'About', icon: 'pi pi-info', to: '/About' }]
    }
  }
}
</script>
