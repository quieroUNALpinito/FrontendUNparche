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
          :step="1"
          :min="0"
          :max="50"
          class="textinputs100"
        />
        <label for="duracion">Duración (horas)</label>
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
    <div class="p-m-4">
      <span>
        <label>¿Lugar oficial?</label><br />
        <InputSwitch id="bloficial" v-model="bloficial" />
      </span>
    </div>
    <div class="p-m-4">
      <span class="p-float-label">
        <Dropdown id="edificio" v-model="edificio" class="dropdowns100" />
        <label for="edificio">Edificio</label>
      </span>
    </div>
    <div class="p-m-4">
      <span class="p-float-label">
        <Dropdown
          id="lugaroficial"
          v-model="lugaroficial"
          class="dropdowns100"
        />
        <label for="lugaroficial">Lugar</label>
      </span>
    </div>
    <div class="p-grid p-flex-row-reverse m-4">
      <div class="p-shadow-6 p-m-6">
        <Button label="Siguiente" @click="siguiente" />
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
      asunto: '',
      descripcion: '',
      tipoEvento: '',
      fecha: '',
      duracion: 0,
      presencial: false,
      bloficial: false,
      edificio: null,
      lugaroficial: null,
      recurrente: false
    }
  },
  methods: {
    loadTiposEvento: function () {
      console.log('cargando tipos de evento')
      axios
        .get('http://localhost:8080/api/eventos/tiposEvento')
        .then(response => {
          console.log(response.data.data)
          this.tiposEvento = response.data.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    siguiente: function () {
      console.log('enviando')
    }
  },
  mounted: function () {
    console.log('mounted!')
    this.loadTiposEvento()
  }
}
</script>
