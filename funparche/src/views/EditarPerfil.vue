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
            <h3>{{nombre}}</h3>
            <h4>{{correo}}</h4>
          </div>
        </div>
        <h3>DESCRIPCION</h3>
        <textarea rows="5" v-model="descripcion"></textarea><br>
        <button @click="updatePerfilInfo">Actualizar</button>
        <button @click="getPerfilInfo">obtener</button>
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
      id: 2,
      myavatar: '../../img/elon.png'
    }
  },
  components: {
    // vAvatar
  },
  methods: {
    updatePerfilInfo () {
      this.axios.post('http://localhost:8080/api/usuarios/updatePerfilInfo', {
        id: this.id,
        descripcion: this.descripcion
      }).then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.warn(error)
      })
    },
    getPerfilInfo () {
      this.axios.post('http://localhost:8080/api/usuarios/getPerfilInfo', {
        id: 2
      }).then((response) => {
        console.log(response.data)
        this.nombre = response.data.data[0].Nombres + ' ' + response.data.data[0].Apellidos
        this.correo = response.data.data[0].Correo
        this.descripcion = response.data.data[0].Descripcion
        this.myavatar = response.data.data[0].Foto
      }).catch((error) => {
        console.warn(error)
      })
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
