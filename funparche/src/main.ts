import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import PrimeVue from 'primevue/config'
import Menu from 'primevue/menu'

import 'primevue/resources/themes/vela-purple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(router).mount('#app')

app.component('Menu', Menu)
