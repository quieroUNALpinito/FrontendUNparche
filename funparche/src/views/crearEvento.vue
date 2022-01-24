<template>
  <div>
    <h1>Crear evento</h1>
    <div class="p-m-4">
      <span class="p-float-label">
        <InputText
          id="asunto"
          type="text"
          v-model="asunto"
          class="textinputs100"
        />
        <label for="asunto">Asunto</label>
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
        <label for="descripcion">Descripcion</label>
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
            <label for="tipoEvento">Tipo de evento</label>
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
            <label for="fecha">Fecha y hora</label>
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
              class="textinputs100"
            />
            <label for="duracion">Duración</label>
          </span>
        </div>
      </div>
    </div>
    <div class="p-m-4">
      <div class="p-grid">
        <div class="p-col">
          <div class="p-grid p-ai-center vertical-container">
            <div class="p-col">
              <label>¿Evento privado?</label>
            </div>
            <div class="p-col">
              <InputSwitch id="privacidad" v-model="privado" />
            </div>
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
              <label for="edificio">Edificio</label>
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
          <label for="nombreubicacion">Ubicación relativa</label>
        </span>
      </div>
    </div>
    <div class="p-grid p-flex-row-reverse m-4">
      <div class="p-shadow-6 p-m-6">
        <Button label="Crear Evento" @click="siguiente" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      tiposEvento: null,
      edificios: null,
      lugares: null,
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
      nombreubicacion: '',
      privado: false,
      usuario: localStorage.ID
    }
  },
  methods: {
    loadTiposEvento: function () {
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
    clear: function () {
      this.asunto = ''
      this.descripcion = ''
      this.tipoEvento = ''
      this.fecha = ''
      this.duracion = 1
      this.presencial = false
      this.bloficial = false
      this.edificio = null
      this.lugaroficial = null
      this.recurrente = false
      this.nombreubicacion = ''
      this.privado = false
      this.usuario = localStorage.ID
    },
    siguiente: function () {
      console.log('enviando')
      axios
        .post('http://localhost:8080/api/eventos/crearEvento', {
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
          nombreubicacion: this.nombreubicacion,
          privado: this.privado,
          usuario: this.usuario
        })
        .then((response) => {
          this.clear()
          this.$toast.add({
            severity: response.data.status,
            detail: response.data.message
          })
        })
    }
  },
  mounted: function () {
    this.loadTiposEvento()
    this.loadEdificiosOficiales()
  }
}
</script>
