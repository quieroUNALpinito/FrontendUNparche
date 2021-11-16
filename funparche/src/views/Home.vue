<template>
  <div class="home">
    <div class="layout-sidebar">
      <SideMenu />
    </div>
    <img src="../assets/logo.svg"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SideMenu from '../components/SideMenu.vue'

@Options({
  components: {
    SideMenu
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.layout-sidebar {
  position: fixed;
  width: 300px;
  height: calc(100vh - 9rem);
  z-index: 1;
  top: 7rem;
  left: 2rem;
  background-color: var(--surface-overlay);
  border-radius: 12px;
  padding: 1.5rem;
}
</style>
