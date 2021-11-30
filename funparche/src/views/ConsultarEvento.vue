
<template>
  <div>
    <Card id="filtro">
      <template #title>
        <h2>Filters</h2>
      </template>
      <template #content>
        <Accordion :multiple="true" :activeIndex="0">
          <AccordionTab>
            <template #header>
              <i class="pi pi-calendar"></i>
              <h3>Date</h3>
            </template>
            Content
          </AccordionTab>
          <AccordionTab>
            <template #header>
              <i class="pi pi-calendar"></i>
              <h3>Time</h3>
            </template>
            <span>Escoge la hora libre o el rango de tiempo libre.</span><br />
            <InputText type="time" v-model="inicio" v-on:input="loadEventosByHour" />
            <InputText type="time" v-model="fin"  v-on:input="loadEventosByHour" />
          </AccordionTab>
          <AccordionTab>
            <template #header >
              <i class="pi pi-calendar"></i>
              <h3>Another filter</h3>
            </template>
            Content
          </AccordionTab>
        </Accordion>
      </template>
    </Card>
    <OrderList class="lista" v-model="lista" listStyle="height:auto" dataKey="vin"  >
    <template id="titlel" #header  >
        <h1>List of Events  </h1><p> {{rango}}</p>
    </template>
    <template #item="slotProps">
        <div class="event-item">
          <div class="image-container">
            <img :src="slotProps.item.Imagen" >
          </div>
          <div class="detail-event">
                <span><h5>{{slotProps.item.Nombre}}</h5></span>
                <span>{{slotProps.item.NombreUbicacion}} - {{slotProps.item.Hora}}</span>
           </div>
           <div class="logistic-event">
             <span>Fecha: {{slotProps.item.Hora}}</span>
             <span>Ubicación: {{slotProps.item.CoordenadasUbicación}}</span>
           </div>
        </div>
    </template>
</OrderList>
  </div>

</template>

<script>
import axios from 'axios'
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
#titlel { display:inline;}

::v-global(.p-orderlist-controls) {
  background-color: black;
  visibility: hidden;
  position: absolute,
}
.event-item{
  display: flex;
  align-items: center;
  padding: .5rem;
  width: 100%;

  img{
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
