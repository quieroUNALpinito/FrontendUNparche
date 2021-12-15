<template>
  <div class="p-grid p-ai-center vertical-container">
    <div class="p-col">
      <Button
        type="button"
        label="Sign In"
        style="width: 20rem"
        class="p-d-block p-mx-auto"
        @click="doLogIn()"
      />
      <p></p>
      <InlineMessage
        severity="info"
        style="width: 20rem"
        class="p-d-block p-mx-auto"
        >Recuerde usar su cuenta UNAL</InlineMessage
      >
    </div>
    <div class="p-col">
      <img src="../assets/logo.svg" class="p-m-6 p-p-6" />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { useRouter } from 'vue-router'
import App from '../App.vue'
import { watch } from '@vue/runtime-core'
export default {
  data () {
    return {
      router: useRouter()
    }
  },
  methods: {
    doLogIn: async function () {
      // llamada al backenda
      try {
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          return null
        }
        const body = { id_token: googleUser.getAuthResponse().id_token }
        axios
          .post('http://localhost:8080/api/usuarios/google', body)
          .then((response) => {
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('ID', response.data.ID)
            this.router.push('landing')
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
      } catch (error) {
        // on fail do something
        console.error(error)
        return null
      }

      // App.changeLogIn()
    }
  }
}
</script>
