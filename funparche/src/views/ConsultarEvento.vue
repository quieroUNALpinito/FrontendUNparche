<template>
  <div class="lista">
    <h1>Lista de eventos</h1>
    <div class="p-grid">
      <div class="p-col-3">
        <h4>Filtros</h4>
        <Accordion :multiple="false" :activeIndex="0">
          <AccordionTab>
            <template #header>
              <p>Privacidad</p>
            </template>
            <p>Eventos privados?&nbsp;</p><InputSwitch id="privacidad" v-model="privado" v-on:input="clear"/>
          </AccordionTab>
          <AccordionTab>
            <template #header>
              <i class="pi pi-calendar"></i>
              <p>&nbsp;Fecha</p>
            </template>
            <InputText
              type="date"
              v-model="dinicio"
              v-on:input="loadEventosByDate"
            />
            <InputText
              type="date"
              v-model="dfin"
              v-on:input="loadEventosByDate"
            />
          </AccordionTab>
          <AccordionTab>
            <template #header>
              <i class="pi pi-clock"></i>
              <p>&nbsp;Hora</p>
            </template>
            <span>Escoge la hora libre o el rango de tiempo libre.</span><br />
            <InputText
              type="time"
              v-model="inicio"
              v-on:input="loadEventosByHour"
            />
            <InputText
              type="time"
              v-model="fin"
              v-on:input="loadEventosByHour"
            />
          </AccordionTab>
          <AccordionTab>
            <template #header>
              <i class="pi pi-tags"></i>
              <p>&nbsp;Tipo de Evento</p>
            </template>
            <div v-for="tipo of tiposEvento" :key="tipo.ID" class="p-field-checkbox">
              <Checkbox :id="tipo.ID" name="tipo" :value="tipo" v-model="tiposEventoSeleccionados" v-on:input="loadEventosByType"/>
              <label :for="tipo.ID">{{tipo.Nombre}}</label>
            </div>
          </AccordionTab>
          <AccordionTab>
            <template #header>
              <i class="pi pi-users"></i>
              <p>&nbsp;Mis Grupos</p>
            </template>
            <div v-for="grupo of grupos" :key="grupo.ID" class="p-field-checkbox">
              <Checkbox :id="grupo.ID" name="grupo" :value="grupo" v-model="gruposSeleccionados" v-on:input="loadEventosByGroup"/>
              <label :for="grupo.ID">{{grupo.Nombre}}</label>
            </div>
          </AccordionTab>
          <AccordionTab>
            <template #header>
              <i class="pi pi-map-marker"></i>
              <p>&nbsp;Ubicación</p>
            </template>
            <UbicacionEvento @search="loadEventosByLocation"/>
          </AccordionTab>
        </Accordion>
      </div>
      <div class="p-col lista">
        <OrderList
          class="lista"
          v-model="lista"
          listStyle="height: max"
          dataKey="vin"
          v-model:selection="selection"
          @selection-change="seleccionDeEvento(selection[0].ID)"
        >
          <template #item="slotProps">
            <div class="event-item">
              <div class="image-container">
                <img :src="slotProps.item.Imagen" />
              </div>
              <div class="detail-event">
                <span
                  ><h5>{{ slotProps.item.Nombre }}</h5></span
                >
                <span></span>
              </div>
              <div class="logistic-event">
                <span
                  >Fecha:
                  {{ new Date(slotProps.item.Hora).toLocaleString() }}</span
                >
                <span>
                  <p v-if="!slotProps.item.Presencial">Evento no presencial</p>
                  <p
                    v-if="
                      slotProps.item.Presencial && slotProps.item.LugarOficial
                    "
                  >
                    Ubicación:
                    {{ slotProps.item.Edificio }} -
                    {{ slotProps.item.NombreLOficial }}
                  </p>
                  <p
                    v-if="
                      slotProps.item.Presencial && !slotProps.item.LugarOficial
                    "
                  >
                    Ubicación: {{ slotProps.item.NombreUbicacion }}
                  </p>
                </span>
              </div>
            </div>
          </template>
        </OrderList>
      </div>
    </div>
  </div>
  <verEvento  ref="ver"></verEvento>
<circle-progress :percent="40" />
</template>

<script>
import axios from 'axios'
import verEvento from '../components/verEvento'
import UbicacionEvento from '../components/UbicacionEvento'

export default {
  data () {
    return {
      value_time: null,
      lista: [],
      tiposEvento: [],
      tiposEventoSeleccionados: [],
      inicio: '',
      fin: '24:00',
      dinicio: '01-01-2000',
      dfin: '01-01-3000',
      rango: '',
      display: false,
      evento: null,
      privado: false,
      usuario: localStorage.ID,
      grupos: [],
      gruposSeleccionados: []
    }
  },
  components: {
    verEvento,
    UbicacionEvento
  },
  methods: {
    clear: function () {
      this.value_time = null
      this.lista = []
      this.tiposEventoSeleccionados = []
      this.gruposSeleccionados = []
      this.inicio = ''
      this.fin = '24:00'
      this.rango = ''
      this.display = false
      this.evento = null
      this.usuario = localStorage.ID
      this.loadEventos()
      this.loadGrupos()
    },
    loadTipos: function () {
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
    loadGrupos: function () {
      console.log('cargando grupos a los que pertenece el usuario autenticado')
      axios
        .post('http://localhost:8080/api/eventos/gruposDeUsuario', {
          usuario: this.usuario
        })
        .then((response) => {
          this.grupos = response.data.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    loadEventos: function () {
      console.log('cargando eventos')
      axios
        .post('http://localhost:8080/api/eventos/listarEventos', {
          usuario: this.usuario,
          privado: this.privado,
          grupos: this.grupos
        })
        .then((response) => {
          this.lista = response.data.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    loadEventosByHour: function () {
      this.rango = 'Betwen ' + this.inicio + ' to ' + this.fin
      axios
        .post('http://localhost:8080/api/eventos/listarEventosByHour', {
          inicio: this.inicio,
          fin: this.fin,
          usuario: this.usuario,
          privado: this.privado,
          grupos: this.grupos
        })
        .then((response) => {
          this.lista = response.data.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    loadEventosByDate: function () {
      this.rango = 'Between ' + this.inicio + ' to ' + this.fin
      axios
        .post('http://localhost:8080/api/eventos/listarEventosByDate', {
          inicio: this.dinicio,
          fin: this.dfin
        })
        .then((response) => {
          this.lista = response.data.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    seleccionDeEvento: function (idEvento) {
      this.$refs.ver.openWindow(idEvento)
    },
    loadEventosByType: function () {
      if (this.tiposEventoSeleccionados.length > 0) {
        axios
          .post('http://localhost:8080/api/eventos/listarEventosByType', {
            tipos: this.tiposEventoSeleccionados,
            usuario: this.usuario,
            privado: this.privado,
            grupos: this.grupos
          })
          .then((response) => {
            this.lista = response.data.data
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
      } else {
        console.log('vacio')
      }
    },
    loadEventosByGroup: function () {
      if (this.gruposSeleccionados.length > 0) {
        axios
          .post('http://localhost:8080/api/eventos/listarEventosByGroup', {
            gruposSeleccionados: this.gruposSeleccionados,
            usuario: this.usuario,
            privado: this.privado,
            grupos: this.grupos
          })
          .then((response) => {
            this.lista = response.data.data
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
      } else {
        console.log('vacio')
      }
    },
    loadEventosByLocation: function (edificio) {
      axios
        .post('http://localhost:8080/api/eventos/listarEventosByLocation', {
          edificio: edificio,
          usuario: this.usuario,
          privado: this.privado,
          grupos: this.grupos
        })
        .then((response) => {
          this.lista = response.data.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }
  },
  mounted: function () {
    this.loadGrupos()
    this.loadTipos()
    this.loadEventos()
  }
}
</script>

<style lang="scss" scoped>
#filtro {
  width: 20%;
  float: left;
}
#titlel {
  display: inline;
}

::v-global(.p-orderlist-controls) {
  background-color: black;
  visibility: hidden;
  position: absolute;
}
.event-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  width: 100%;

  img {
    width: 75px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 1rem;
  }
  .detail-event {
    flex: 1 1 0;
    align-items: center;
  }
  .logistic-event {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
