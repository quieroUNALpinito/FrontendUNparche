import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

<<<<<<< HEAD
import 'primevue/resources/themes/vela-purple/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.css'

import PrimeVue from 'primevue/config'
import Menu from 'primevue/menu'
=======
import PrimeVue from 'primevue/config'
>>>>>>> feature/crearEvento
import Steps from 'primevue/steps'
import Button from 'primevue/button'
import MegaMenu from 'primevue/megamenu'
import InputText from 'primevue/inputtext'
<<<<<<< HEAD


const app = createApp(App)
app.use(PrimeVue)

app.component('Menu', Menu)
=======
import TextArea from 'primevue/textarea'
import ToastService from 'primevue/toastservice'
import Card from 'primevue/card'
import Toast from 'primevue/toast'

import 'primeflex/primeflex.css'
import 'primevue/resources/themes/saga-purple/theme.css'
import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue)

>>>>>>> feature/crearEvento
app.component('Steps', Steps)
app.component('Button', Button)
app.component('MegaMenu', MegaMenu)
app.component('InputText', InputText)
<<<<<<< HEAD

app.use(router)
=======
app.component('TextArea', TextArea)
app.component('Card', Card)
app.component('Toast', Toast)

app.use(router)
app.use(ToastService)
>>>>>>> feature/crearEvento
app.mount('#app')
