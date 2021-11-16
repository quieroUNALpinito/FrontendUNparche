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
          <InputText type="time" />
          <InputText type="time" />
        </AccordionTab>
        <AccordionTab>
          <template #header>
            <i class="pi pi-calendar"></i>
            <h3>Another filter</h3>
          </template>
          Content
        </AccordionTab>
      </Accordion>
    </template>
  </Card>
  <Card id="Lista">
    <template #title>
      <h2>List of Events</h2>
    </template>
    <template #content>
      <div>
        <table class="table">
          <tr>
            <th>Nombre de Evento</th>
            <th>Lugar</th>
            <th>Hora de inicio</th>
          </tr>
          <tr v-for="item in lista" :key="item.nombre">
            <td v-text="item.Evento"></td>
            <td v-text="item.lugar"></td>
            <td v-text="item.hora"></td>
          </tr>
        </table>
      </div>
    </template>
  </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value_time: null,
      lista: [
        {
          Evento: 'Evento 1',
          lugar: 'Lugar del evento 1',
          hora: 'hora de inicio'
        },
        {
          Evento: 'Evento 2',
          lugar: 'Lugar del evento 2',
          hora: 'hora de inicio'
        },
        {
          Evento: 'Evento 3',
          lugar: 'Lugar del evento 3',
          hora: 'hora de inicio'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#filtro {
  width: 25%;
  float: left;
}
</style>
