<template>
  <div class="lista">
    <h1>Lista de eventos</h1>
    <div class="p-grid">
      <div class="p-col-3">
        <h4>Filtros</h4>
        <Accordion :multiple="false" :activeIndex="0">
          <AccordionTab>
            <template #header>
              <i class="pi pi-calendar"></i>
              <p>Date</p>
            </template>
            Content
          </AccordionTab>
          <AccordionTab>
            <template #header>
              <i class="pi pi-calendar"></i>
              <p>Time</p>
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
              <i class="pi pi-map-marker"></i>
              <p>Ubicación</p>
            </template>
            <UbicacionEvento />
          </AccordionTab>
        </Accordion>
      </div>
      <div class="p-col lista">
        <OrderList
          class="lista"
          v-model="lista"
          listStyle="height: max"
          dataKey="vin"
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
</template>

<script>
import axios from 'axios'
import UbicacionEvento from '../components/UbicacionEvento'

export default {
  data () {
    return {
      value_time: null,
      lista: [],
      inicio: '',
      fin: '24:00',
      rango: ''
    }
  },
  components: {
    UbicacionEvento
  },
  methods: {
    loadEventos: function () {
      console.log('cargando tipos de evento')
      axios
        .get('http://localhost:8080/api/eventos/listarEventos')
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
          fin: this.fin
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
