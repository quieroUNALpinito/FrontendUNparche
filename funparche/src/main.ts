import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'primevue/resources/themes/vela-purple/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.css'
import './assets/styles/layout.scss'

import PrimeVue from 'primevue/config'
import Menu from 'primevue/menu'
import Steps from 'primevue/steps'
import Button from 'primevue/button'
import MegaMenu from 'primevue/megamenu'
import InputText from 'primevue/inputtext'
import TextArea from 'primevue/textarea'
import ToastService from 'primevue/toastservice'
import Card from 'primevue/card'
import Toast from 'primevue/toast'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'

const app = createApp(App)

app.use(PrimeVue)

app.component('Steps', Steps)
app.component('Button', Button)
app.component('MegaMenu', MegaMenu)
app.component('InputText', InputText)
app.component('TextArea', TextArea)
app.component('Card', Card)
app.component('Toast', Toast)
app.component('Menu', Menu)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('Dropdown', Dropdown)
app.component('Checkbox', Checkbox)

app.use(router)
app.use(ToastService)
app.mount('#app')
