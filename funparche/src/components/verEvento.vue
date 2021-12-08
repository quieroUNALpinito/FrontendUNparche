<template>
  <Dialog header="Header" v-model:visible="isVisible"> {{evento}} </Dialog>
</template>

<script>
import axios from 'axios'
export default {
  name: 'verEvento',

  data: () => ({
    isVisible: false,
    evento: null
  }),
  props: {
    idEvento: null
  },

  methods: {
    openWindow (idEvento) {
      this.verEventoFunction(idEvento)
      this.isVisible = true
    },

    close () {
      this.isVisible = false
    },

    verEventoFunction: function (idEvento) {
      axios
        .post('http://localhost:8080/api/eventos/verEvento', {
          id: idEvento
        })
        .then((response) => {
          this.evento = response.data.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }
  }
}
</script>

<style></style>
