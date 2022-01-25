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
      <h3>Editar evento</h3>
    </template>
    <div class="p-m-4">
      <span class="p-float-label">
        <InputText
          id="asunto"
          type="text"
          v-model="asunto"
          class="textinputs100"
        />
        <label for="asunto">{{ evento.Nombre }}</label>
      </span>
    </div>
    <div class="p-m-4">
      <span class="p-float-label">
        <TextArea
          id="descripcion"
          type="text"
          v-model="descripcion"
          :autoResize="true"
          rows="3"
          class="textareas100"
        />
        <label for="descripcion">{{ evento.Descripcion }}</label>
      </span>
    </div>
    <div class="p-m-4">
      <div class="p-grid">
        <div class="p-col">
          <span class="p-float-label">
            <Dropdown
              id="tipoEvento"
              v-model="tipoEvento"
              :options="tiposEvento"
              optionLabel="Nombre"
              class="dropdowns100"
            />
            <label for="tipoEvento">{{ tipoEvento.Nombre }}</label>
          </span>
        </div>
        <div class="p-col">
          <div class="p-grid p-ai-center vertical-container">
            <div class="p-col">
              <label>¿Evento recurrente?</label>
            </div>
            <div class="p-col">
              <InputSwitch id="recurrente" v-model="recurrente" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-m-4">
      <div class="p-grid">
        <div class="p-col">
          <span class="p-float-label">
            <Calendar
              id="fecha"
              v-model="fecha"
              :showTime="true"
              hourFormat="12"
              class="textinputs100"
              :hideOnDateTimeSelect="true"
            />
            <label for="fecha">{{
              new Date(evento.Hora).toLocaleString()
            }}</label>
          </span>
        </div>
        <div class="p-col">
          <span class="p-float-label">
            <InputNumber
              id="duracion"
              v-model="duracion"
              showButtons
              buttonLayout="horizontal"
              suffix=" horas "
              :step="1"
              :min="1"
              :max="50"
              :autoResize="true"
              class="textinputs100"
            />
            <label for="duracion">{{ evento.Duracion }}</label>
          </span>
        </div>
      </div>
    </div>
    <div class="p-m-4">
      <div class="p-grid">
        <div class="p-col">
          <div class="p-grid p-ai-center vertical-container">
            <div class="p-col">
              <label>¿Evento presencial?</label>
            </div>
            <div class="p-col">
              <InputSwitch id="presencial" v-model="presencial" />
            </div>
          </div>
        </div>
        <div class="p-col">
          <div
            class="p-grid p-ai-center vertical-container"
            v-if="this.presencial"
          >
            <div id="ubicacion" class="p-col">
              <label>¿Lugar oficial?</label>
            </div>
            <div class="p-col">
              <InputSwitch id="bloficial" v-model="bloficial" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-m-4" v-if="this.presencial">
      <div id="lugaroficial" v-if="this.bloficial">
        <div class="p-grid">
          <div class="p-col">
            <span class="p-float-label">
              <Dropdown
                id="edificio"
                v-model="edificio"
                class="dropdowns100"
                :options="edificios"
                optionLabel="Edificio"
                v-on:change="loadLugaresDeEdificio($event)"
              />
              <label for="edificio">{{
                edificios[evento.ID_lugaOficial - 1]
              }}</label>
            </span>
          </div>
          <div class="p-col">
            <span class="p-float-label">
              <Dropdown
                id="lugaroficial"
                v-model="lugaroficial"
                class="dropdowns100"
                :options="lugares"
                optionLabel="Nombre"
              />
              <label for="lugaroficial">Lugar</label>
            </span>
          </div>
        </div>
      </div>
      <div id="lugarnooficial" v-if="!this.bloficial">
        <span class="p-float-label">
          <InputText
            id="nombreubicacion"
            v-model="nombreubicacion"
            class="textinputs100"
          />
          <label for="nombreubicacion">{{ evento.NombreUbicacion }}</label>
        </span>
      </div>
    </div>
    <div class="p-grid p-flex-row-reverse m-4"></div>
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
      <Button
        label="Actualizar"
        icon="pi pi-user-edit"
        autofocus
        @click="actualizar()"
      />
      <Button label="Cancelar" icon="pi pi-check" @click="close()" />
    </template>
  </Dialog>
</template>

<script>
import axios from 'axios'
import 'vue3-circle-progress/dist/circle-progress.css'
export default {
  name: 'editarEvento',

  data () {
    return {
      isVisible: false,
      evento: {},
      dias: null,
      tiposEvento: null,
      edificios: null,
      asunto: '',
      descripcion: '',
      tipoEvento: '',
      fecha: '',
      duracion: 1,
      presencial: false,
      bloficial: false,
      edificio: null,
      lugaroficial: null,
      recurrente: false,
      nombreubicacion: ''
    }
  },
  components: {},
  methods: {
    async openWindow (idEvento) {
      this.evento = idEvento
      this.asunto = idEvento.Nombre
      this.descripcion = idEvento.Descripcion
      this.recurrente = idEvento.Recurrente
      this.tipoEvento = this.tiposEvento[idEvento.ID_TipoEvento - 1]
      this.lugaroficial = this.edificios[idEvento.ID_lugarOficial - 1]
      this.presencial = idEvento.Presencial
      this.bloficial = idEvento.LugarOficial
      this.fecha = idEvento.Hora
      this.duracion = parseInt(idEvento.Duracion)
      this.nombreubicacion = idEvento.NombreUbicacion
      this.isVisible = true
    },
    loadTiposEvento: async function () {
      await axios
      console.log('cargando tipos de evento')
      axios
        .get('http://localhost:8080/api/eventos/tiposEvento')
        .then((response) => {
          this.tiposEvento = response.data.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    loadEdificiosOficiales: function () {
      console.log('cargando edificios oficiales')
      axios
        .get('http://localhost:8080/api/recursos/edificiosLugaresOficiales')
        .then((response) => {
          this.edificios = response.data.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    loadLugaresDeEdificio: function (event) {
      console.log('cargando lugares del edificio')
      axios
        .post('http://localhost:8080/api/recursos/lugarPorEdificio', {
          edificio: event.value.Edificio
        })
        .then((response) => {
          this.lugares = response.data.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },

    close: async function () {
      this.isVisible = false
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
    actualizar: function () {
      console.log('enviando')
      axios
        .post('http://localhost:8080/api/eventos/actualizarEvento', {
          id: this.evento.ID,
          asunto: this.asunto,
          descripcion: this.descripcion,
          tipoEvento: this.tipoEvento,
          fecha: this.fecha,
          duracion: this.duracion,
          presencial: this.presencial,
          bloficial: this.bloficial,
          edificio: this.edificio,
          lugaroficial: this.lugaroficial,
          recurrente: this.recurrente,
          nombreubicacion: this.nombreubicacion
        })
        .then((response) => {
          this.$toast.add({
            severity: response.data.status,
            detail: response.data.message
          })
        })
      this.isVisible = false
      this.$parent.cargarActualizacion(this.evento.ID)
    }
  },
  mounted: function () {
    this.loadTiposEvento()
    this.loadEdificiosOficiales()
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
