import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'primevue/resources/themes/vela-purple/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.css'
import gAuthPlugin from 'vue3-google-oauth2'

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
import Message from 'primevue/message'
import InlineMessage from 'primevue/inlinemessage'

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
app.component('Message', Message)
app.component('InlineMessage', InlineMessage)

const gauthClientId =
  '832086360772-parslg4nd9jl5shdoats8rhucep5tmfv.apps.googleusercontent.com'
app.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: 'email',
  prompt: 'consent',
  fetch_basic_profile: false
})
app.use(router)
app.use(ToastService)
app.mount('#app')
