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
        { label: 'UNparche', to: '/', icon: 'menuMainIcon' },
        {
          label: 'Crear Evento',
          icon: 'pi pi-calendar-plus',
          to: '/crearEvento'
        },
        {
          label: 'Consultar Evento',
          icon: 'pi pi-search',
          to: '/consultarEvento'
        },
        { label: 'About', icon: 'pi pi-info', to: '/About' }
      ]
    }
  }
}
</script>

<style>
.menuMainIcon {
  background: url('./assets/logo.png');
}

.textinputs100 {
  width: 100%;
}

.textareas100 {
  width: 100%;
  resize: none;
}

.dropdowns100 {
  width: 100%;
}

.textinputs33 {
  width: 33%;
}

.dropdowns33 {
  width: 33%;
}
</style>
