<template>
  <div>
    <h1>Perfil</h1>
    <div class="p-grid">
      <div class="p-col-5">
        <img class="imgRound" :src="myavatar" />
      </div>
      <div class="p-col-7">
        <h3>Nombre: {{ nombre }}</h3>
        <h4>Correo: {{ correo }}</h4>
      </div>
    </div>
    <div class="m-y-4 p-p-1"></div>
    <div>
      <label>Descripcion</label>
      <TextArea rows="3" v-model="descripcion" class="textareas100" />
    </div>
    <div class="p-grid p-flex-row-reverse">
      <div class="p-mt-4 p-mb-0">
        <Button @click="updatePerfilInfo" label="Actualizar" />
        <!-- <button @click="getPerfilInfo">obtener</button> -->
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
      // id: localStorage.token.ID
      id: 4,
      myavatar: '../../img/elon.png'
    }
  },
  components: {
    // vAvatar
  },
  methods: {
    updatePerfilInfo () {
      this.axios
        .post('http://localhost:8080/api/usuarios/updatePerfilInfo', {
          id: this.id,
          descripcion: this.descripcion
        })
        .then((response) => {
          console.log(response.data)
          this.getPerfilInfo()
        })
        .catch((error) => {
          console.warn(error)
        })
    },
    getPerfilInfo () {
      this.axios
        .post('http://localhost:8080/api/usuarios/getPerfilInfo', {
          id: this.id
        })
        .then((response) => {
          console.log(response.data)
          this.nombre =
            response.data.data[0].Nombres +
            ' ' +
            response.data.data[0].Apellidos
          this.correo = response.data.data[0].Correo
          this.descripcion = response.data.data[0].Descripcion
          this.myavatar = response.data.data[0].Foto
        })
        .catch((error) => {
          console.warn(error)
        })
    }
  },
  mounted () {
    this.id = localStorage.ID
    this.$nextTick(this.getPerfilInfo)
  }
}
</script>
