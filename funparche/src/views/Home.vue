<template>
  <div class="p-grid">
    <div class="p-col-3">
      <SideMenu />
    </div>
    <div class="p-col-9">
      <img src="../assets/logo.svg" class="p-m-6 p-p-6"/>
    </div>
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
