<template>
  <div class="p-col lista">
    <OrderList
      class="lista"
      v-model="lista"
      listStyle="height: max"
      dataKey="vin"
      
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
              >Fecha: {{ new Date(slotProps.item.Hora).toLocaleString() }}</span
            >
            <span>
              <p v-if="!slotProps.item.Presencial">Evento no presencial</p>
              <p
                v-if="slotProps.item.Presencial && slotProps.item.LugarOficial"
              >
                Ubicación:
                {{ slotProps.item.Edificio }} -
                {{ slotProps.item.NombreLOficial }}
              </p>
              <p
                v-if="slotProps.item.Presencial && !slotProps.item.LugarOficial"
              >
                Ubicación: {{ slotProps.item.NombreUbicacion }}
              </p>
            </span>
          </div>
        </div>
      </template>
    </OrderList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

</script>
