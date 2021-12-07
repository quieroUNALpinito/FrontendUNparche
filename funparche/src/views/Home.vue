<template>
  <div>
    <div class="p-col-3">
      <SideMenu />
    </div>
    <div class="p-d-flex p-jc-center">
      <div class="p-m-2 p-p-4 logolanding">
        <img src="../assets/logo.svg" class="p-d-block p-m-auto logolanding" />
      </div>
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
