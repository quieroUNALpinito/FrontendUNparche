<template>
  <div class="card">
    <div class="p-grid nested-grid">
      <div class="p-col-fixed" style="width:35px"></div>
      <div class="p-col">
        <div class="p-col-11 p-md-8 p-lg-4">
          <h1>Perfil</h1>
          <div class="p-grid p-justify-start">
            <div class="p-col-fixed" style="width:120px">
              <img id="imgRound" :src="myavatar" width="100" height="100">
            </div>
            <div class="p-col">
              <h3>{{nombre}}</h3>
              <h4>{{correo}}</h4>
            </div>
          </div>
            <div class="p-grid nested-grid p-dir-col">
              <div class="p-col">
                <h3>DESCRIPCION</h3>
                <TextArea id="mytextarea" rows="5" v-model="descripcion" class="textareas100"></TextArea>
              </div>
              <div class="p-grid p-justify-end">
                <div class="p-col-4">
                  <Button id="mybutton" @click="updatePerfilInfo">Actualizar</Button>
                  <!-- <button @click="getPerfilInfo">obtener</button> -->
                </div>
              </div>
            </div>
        </div>
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
      this.axios.post('http://localhost:8080/api/usuarios/updatePerfilInfo', {
        id: this.id,
        descripcion: this.descripcion
      }).then((response) => {
        console.log(response.data)
        this.getPerfilInfo()
      }).catch((error) => {
        console.warn(error)
      })
    },
    getPerfilInfo () {
      this.axios.post('http://localhost:8080/api/usuarios/getPerfilInfo', {
        id: this.id
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
  },
  mounted () {
    this.id = localStorage.ID
    this.$nextTick(this.getPerfilInfo)
  }
}

</script>

<style>

#mytextarea {
    width: 100%;
    background-color: #1f2d40;
    border: solid 1px #777777;
    color: #e1e1e1;
    font-size: 13px;
    padding-left: 4px;
}

#imgRound {
  border-radius: 50%;
  object-fit: cover;
}

#mybutton{
  background-color: #64B687;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
  width: 100%;
}
#mybutton:hover {
  background-color: #5aa67b;
  transition: 0.3s ease-in-out;
}

</style>
