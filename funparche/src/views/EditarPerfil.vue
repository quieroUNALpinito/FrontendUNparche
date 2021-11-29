<template>
  <div class="card">
    <div class="p-grid nested-grid">
      <div class="p-col-fixed" style="width:50px"></div>
      <div class="p-col-3">
        <h1>Editar Perfil</h1><hr>
        <div class="p-grid p-justify-center">
          <div class="p-col-3">
            <img :src="myavatar" width="100" height="100">
          </div>
          <div class="p-col-9">
            <p>{{nombre}}</p>
            <p>e-mail: {{correo}}</p>
          </div>
        </div>
        <h3>DESCRIPCION</h3>
        <textarea rows="5" v-model="descripcion"></textarea><br>
        <button @click="actualizarDesc">Actualizar</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { reactive } from 'vue'
// npm install vue-avatar
// import Avatar from 'vue-avatar'
// import vAvatar from '@amaury-tobias/v-avatar'

export default {
  name: 'EditarPerfil',
  data () {
    return {
      nombre: 'nombre por defecto',
      correo: 'pordefecto@unal.edu.co',
      descripcion: 'descripcion por defecto',
      id: 1,
      myavatar: '../../img/elon.png'
    }
  },
  components: {
    // vAvatar
  },
  methods: {
    actualizarDesc () {
      this.axios.post('http://localhost:8080/api/usuarios', {
        id: this.id,
        descripcion: this.descripcion
      }).then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.warn(error)
      })
      console.log(this.descripcion)
    }
  }
}

</script>

<style>
textarea {
    width: 500px;
    background-color: #1f2d40;
    border: solid 1px #777777;
    color: #e1e1e1;
    font-size: 13px;
    padding-left: 4px;
}

img {
  border-radius: 50%;
  object-fit: cover;
}

button{
  background-color: #64B687;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}
button:hover {
  background-color: #5aa67b;
  transition: 0.3s ease-in-out;
}
</style>
