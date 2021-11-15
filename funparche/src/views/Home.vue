<template>
  <div class="home">
    <SideMenu />
    <HelloWorld msg="Hola mundo" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import SideMenu from '../components/SideMenu.vue'

@Options({
  components: {
    HelloWorld,
    SideMenu
  }
})
export default class Home extends Vue {}
</script>
