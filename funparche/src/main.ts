import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'primevue/resources/themes/vela-purple/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.css'

import PrimeVue from 'primevue/config'
import Menu from 'primevue/menu'
import Steps from 'primevue/steps'
import Button from 'primevue/button'
import MegaMenu from 'primevue/megamenu'
import InputText from 'primevue/inputtext'


const app = createApp(App)
app.use(PrimeVue)

app.component('Menu', Menu)
app.component('Steps', Steps)
app.component('Button', Button)
app.component('MegaMenu', MegaMenu)
app.component('InputText', InputText)

app.use(router)
app.mount('#app')
