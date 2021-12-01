<template>
  <div>
    <h1>quieroUNalpinito</h1>
    <div class="p-grid">
      <div class="p-col p-m-2 p-p-2">
        <div class="card" style="background: #ba68c8e0">
          <Avatar label="VM" size="xlarge" shape="circle"/>
          <h2>Vinnie Giuliano Mellizo Molina</h2>
          <p>Desarrollo FrontEnd y BackEnd</p>
        </div>
      </div>
      <div class="p-col p-m-2 p-p-2">
        <div class="card" style="background: #ba68c8e0">
          <Avatar label="DM" size="xlarge" shape="circle"/>
          <h2>Daniel Arturo Moreno Rincón</h2>
          <p>Desarrollo FrontEnd y BackEnd</p>
        </div>
      </div>
      <div class="p-col p-m-2 p-p-2">
        <div class="card" style="background: #ba68c8e0">
          <Avatar label="PC" size="xlarge" shape="circle"/>
          <h2>Paula Alejandra Cadena Espita</h2>
          <p>Desarrollo FrontEnd y BackEnd</p>
        </div>
      </div>
    </div>
    <div class="p-grid">
      <div class="p-col p-m-2 p-p-2">
        <div class="card" style="background: #ba68c8e0">
          <Avatar label="NO" size="xlarge" shape="circle"/>
          <h2>Nicholson Stive Ochoa Garcia</h2>
          <p>Desarrollo FrontEnd y BackEnd</p>
        </div>
      </div>
      <div class="p-col p-m-2 p-p-2">
        <div class="card" style="background: #ba68c8e0">
          <Avatar label="JR" size="xlarge" shape="circle"/>
          <h2>Johan Sebastian Romero Diaz</h2>
          <p>Desarrollo FrontEnd y BackEnd</p>
        </div>
      </div>
      <div class="p-col p-m-2 p-p-2">
        <div class="card" style="background: #ba68c8e0">
          <Avatar label="JC" size="xlarge" shape="circle"/>
          <h2>Jorge Camilo Colmenares Santos</h2>
          <p>Desarrollo FrontEnd y BackEnd</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted } from '@vue/runtime-core'

export default {
  mounted: function () {
    if (!localStorage.token) {
      console.log('tenemos token!')
    }
  }
}
</script>
