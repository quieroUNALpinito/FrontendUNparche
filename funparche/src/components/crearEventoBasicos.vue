<template>
  <div>
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
          class="textareas100"
        />
        <label for="descripcion">Descripcion</label>
      </span>
    </div>
    <div class="p-m-4">
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
    <div class="p-m-4">
      <span class="p-float-label">
        <Calendar
          id="fecha"
          v-model="fecha"
          :showTime="true"
          hourFormat="12"
          class="textinputs100"
        />
        <label for="fecha">Fecha</label>
      </span>
    </div>
    <div class="p-m-4">
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
    <div class="p-m-4">
      <span>
        <label>¿Evento recurrente?</label><br />
        <InputSwitch id="recurrente" v-model="recurrente" />
      </span>
    </div>
    <div class="p-m-4">
      <span>
        <label>¿Evento presencial?</label><br />
        <InputSwitch id="presencial" v-model="presencial" />
      </span>
    </div>
    <div id="ubicacion" v-if="this.presencial">
      <div class="p-m-4">
        <span>
          <label>¿Lugar oficial?</label><br />
          <InputSwitch id="bloficial" v-model="bloficial" />
        </span>
      </div>
      <div id="lugaroficial" v-if="this.bloficial">
        <div class="p-m-4">
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
        <div class="p-m-4">
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
      <div id="lugarnooficial" v-if="!this.bloficial">
        <div class="p-m-4">
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
      nombreubicacion: ''
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
          nombreubicacion: this.nombreubicacion
        })
        .then((response) => {
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
