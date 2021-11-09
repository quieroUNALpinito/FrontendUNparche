import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Steps from 'primevue/steps'
import Button from 'primevue/button'
import MegaMenu from 'primevue/megamenu'
import InputText from 'primevue/inputtext'

import 'primeflex/primeflex.css'
import 'primevue/resources/themes/saga-purple/theme.css'
import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue)

app.component('Steps', Steps)
app.component('Button', Button)
app.component('MegaMenu', MegaMenu)
app.component('InputText', InputText)

app.use(router)
app.mount('#app')
