import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Steps from 'primevue/steps'
import Button from 'primevue/button'
import MegaMenu from 'primevue/megamenu'
import InputText from 'primevue/inputtext'
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

app.component('Steps', Steps)
app.component('Button', Button)
app.component('MegaMenu', MegaMenu)
app.component('InputText', InputText)
app.component('TextArea', TextArea)
app.component('Card', Card)
app.component('Toast', Toast)

app.use(router)
app.use(ToastService)
app.mount('#app')
