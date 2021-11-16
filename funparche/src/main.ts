import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
<<<<<<< HEAD

<<<<<<< HEAD
import 'primevue/resources/themes/vela-purple/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.css'

=======
>>>>>>> bfdc22628803334bec41edb951ade76c0768dd50
import PrimeVue from 'primevue/config'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Card from 'primevue/card'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Calendar from 'primevue/calendar'
import OrderList from 'primevue/orderlist'
import Menu from 'primevue/menu'
=======
import PrimeVue from 'primevue/config'
>>>>>>> feature/crearEvento
import Steps from 'primevue/steps'
import Button from 'primevue/button'
import MegaMenu from 'primevue/megamenu'
import InputText from 'primevue/inputtext'
<<<<<<< HEAD

import 'primevue/resources/themes/vela-purple/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.css'




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
=======
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('Card', Card)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('Calendar', Calendar).component('OrderList', OrderList)
app.use(router).mount('#app')
>>>>>>> bfdc22628803334bec41edb951ade76c0768dd50
