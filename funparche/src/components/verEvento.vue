<template>
  <Dialog
    header="Header"
    footer="Footer"
    v-model:visible="isVisible"
    modal="true"
    maximizable="true"
    dismissableMask="true"
  >
    <template #header>
      <h3>{{ evento.Nombre }}</h3>
    </template>
    <div class="description-event">
      <Image
        :src="evento.Imagen"
        alt="Image Event"
        preview
        width="400"
        class="image"
      ></Image>
      <span v-if="evento.nombregrupo">
        Este es un evento del grupo:
        <h4>{{ evento.nombregrupo }}</h4>
      </span>
      <span v-else> Este evento no tiene un grupo asociado </span>
      <span class="description">
        {{ evento.Descripcion }}
      </span>
    </div>
    <div class="logistic-event">
      <span>
        <p v-if="!evento.Presencial">Evento no presencial</p>
        <p v-if="evento.Presencial && evento.LugarOficial">
          Ubicación:
          {{ evento.Edificio }} -
          {{ evento.NombreLOficial }}
        </p>
        <p v-if="evento.Presencial && !evento.LugarOficial">
          Ubicación: {{ evento.NombreUbicacion }}
        </p>
      </span>
      <span>
        <p>
          Duración:
          {{ evento.Duracion }}
        </p>
      </span>
      <span>Fecha: {{ new Date(evento.Hora).toLocaleString() }}</span>
    </div>
    <div class="creador">
      Creador: {{ evento.nombrecreador + ' ' + evento.apellidocreador }}
    </div>

    <template #footer class="footer">
      <div class="cuenta" v-if="dias > 10">
        <circle-progress
          :on-viewport="cuenta()"
          :percent="2"
          :size="40"
          :border-width="15"
          :border-bg-width="15"
          empty-color=""
          fill-color="#84BD00"
        />
        <p>faltan + de 10 dias</p>
      </div>
      <div class="cuenta" v-else-if="dias > 1">
        <circle-progress
          :on-viewport="cuenta()"
          :percent="dias * 10"
          :size="40"
          :border-width="15"
          :border-bg-width="15"
          empty-color=""
          fill-color="#84BD00"
        />
        <p>Faltan {{ dias.toFixed(1) }} dias</p>
      </div>
      <div class="cuenta" v-else-if="dias >= 0">
        <circle-progress
          :on-viewport="cuenta()"
          :percent="100"
          :size="40"
          :border-width="15"
          :border-bg-width="15"
          empty-color=""
          fill-color="#84BD00"
        />
        <p>Es hoy!</p>
      </div>
      <div class="cuenta" v-else>
        <circle-progress
          :on-viewport="cuenta()"
          :percent="100"
          :size="40"
          :border-width="15"
          :border-bg-width="15"
          empty-color=""
          fill-color="#84BD00"
        />
        <p>Este evento ya se realizó</p>
      </div>
      <div>
        <div v-if="!confirmado">
          <Button
            label="Quiero ir!"
            icon="pi pi-check"
            autofocus
            @click="close()"
          />
        </div>
        <div v-else>
          <Button
            label="Ya no quiero ir!"
            icon="pi pi-times"
            autofocus
            @click="desconfirmar()"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script>
import axios from 'axios'
import 'vue3-circle-progress/dist/circle-progress.css'
import CircleProgress from 'vue3-circle-progress'
export default {
  name: 'verEvento',

  data () {
    return {
      isVisible: false,
      evento: {},
      dias: null,
      confirmado: false
    }
  },
  components: {
    CircleProgress
  },
  methods: {
    async openWindow (idEvento) {
      await this.verEventoFunction(idEvento)
      this.isVisible = true
      await this.confirmarAsistencia()
    },

    close: async function () {
      console.log(this.evento)
      console.log(localStorage.ID)
      axios
        .post('http://localhost:8080/api/eventos/confirmarAsistenciaEvento', {
          event: this.evento.ID,
          user: localStorage.ID
        })
        .then((response) => {
          this.$toast.add({
            severity: response.data.status,
            detail: response.data.message
          })
          this.isVisible = false
        })
    },

    verEventoFunction: async function (idEvento) {
      await axios
        .post('http://localhost:8080/api/eventos/verEvento', {
          id: idEvento
        })
        .then((response) => {
          this.evento = response.data.data[0]
          console.log(this.evento)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    cuenta () {
      const fechaActual = new Date()
      const fechaEvento = new Date(this.evento.Hora)
      const diff = fechaEvento - fechaActual
      this.dias = diff / (1000 * 60 * 60 * 24)
    },
    confirmarAsistencia: async function () {
      await axios
        .post(
          'http://localhost:8080/api/eventos/consultarAsistenciaUsuarioEvento',
          {
            event: this.evento.ID,
            user: localStorage.ID
          }
        )
        .then((response) => {
          this.confirmado = response.data.data[0]
          console.log(this.confirmado)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    desconfirmar: async function () {
      await axios
        .post(
          'http://localhost:8080/api/eventos/desconfirmarAsistenciaEvento',
          {
            event: this.evento.ID,
            user: localStorage.ID
          }
        )
        .then((response) => {
          this.$toast.add({
            severity: response.data.status,
            detail: response.data.message
          })
          this.isVisible = false
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.description-event {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(70px, auto);
  .image {
    grid-column: 1;
    grid-row: 1 / 3;
  }
  .description {
    grid-column: 2;
    grid-row: 2;
  }
}
.logistic-event {
  float: bottom;
}
.creador {
  display: flex;
  flex-direction: row-reverse;
}

.cuenta {
  float: left;
}
</style>
