<template>
  <div>
    <Toast />
    <Menubar :model="items" v-if="this.path != '/' && this.path != ''">
      <template #start>
        <img src="./assets/logo.svg" class="logoMenu" />
      </template>
      <template #end>
        <i
          class="pi pi-bell p-mx-4"
          style="font-size: 2rem"
          @click="mostrarPanelNot($event)"
        />
        <OverlayPanel ref="panelNotif">
          <Card>
            <template #content>
              <ul>
                <li v-for="notif in notificationList" v-bind:key="notif">
                  <p>{{ notif.Nombre }} en {{ notif.faltante }} días </p>
                </li>
              </ul>
            </template>
          </Card>
        </OverlayPanel>
        <Button
          label="Logout"
          icon="pi pi-power-off"
          class="p-mx-2"
          @click="this.doLogOut()"
        />
      </template>
    </Menubar>
    <div class="p-d-flex p-jc-center">
      <Card class="cards">
        <template #content>
          <router-view />
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
export default {
  data () {
    return {
      route: useRoute(),
      path: computed(() => this.route.path),
      router: useRouter(),
      notificationList: [],
      items: [
        { label: 'UNparche', to: '/landing', icon: '/assets/logo.png' },
        { label: 'Perfil', to: '/Perfil', icon: 'pi pi-user' },
        {
          label: 'Crear Evento',
          icon: 'pi pi-calendar-plus',
          to: '/crearEvento'
        },
        {
          label: 'Consultar Evento',
          icon: 'pi pi-search',
          to: '/consultarEvento'
        },
        { label: 'Grupos', icon: 'pi pi-bars', to: '/panel' },
        { label: 'About', icon: 'pi pi-info', to: '/About' }
      ]
    }
  },
  name: 'App',
  methods: {
    doLogOut: function () {
      this.router.push('/')
      localStorage.clear()
    },
    mostrarPanelNot: function (event) {
      this.getNotificaciones()
      this.$refs.panelNotif.toggle(event)
    },
    getNotificaciones: function () {
      axios
        .post('http://localhost:8080/api/usuarios/getNotif', {
          idUsuario: localStorage.ID
        })
        .then((response) => {
          this.notificationList = response.data.data
          for (const notif of this.notificationList) {
            notif.faltante = this.timediff(notif.Hora)
          }
        })
        .catch((error) => {
          console.warn(error)
        })
    },
    timediff: function (hora) {
      const hoy = new Date()
      const fecha = new Date(hora)
      var diff = fecha - hoy
      return Math.round(diff / (1000 * 60 * 60 * 24))
    }
  }
}
</script>

<style>
.menuMainIcon {
  background: url('./assets/logo.png');
}

.textinputs100 {
  width: 100%;
}

.textareas100 {
  width: 100%;
  resize: none;
}

.dropdowns100 {
  width: 100%;
}

.textinputs33 {
  width: 33%;
}

.dropdowns33 {
  width: 33%;
}

.nomargin {
  margin: 0px;
  padding: 0px;
}

.mmenu {
  background: black;
}

.cards {
  width: 70%;
  margin: 2%;
  padding: 1%;
}

.imgRound {
  border-radius: 50%;
  object-fit: cover;
  width: 200px;
  height: 200px;
}

.lista {
  height: 100% !important;
}

.avatarCard {
  background: #ba68c86e;
}

.logoMenu {
  width: 50px;
  height: 50px;
}
</style>
