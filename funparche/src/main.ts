import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Card from 'primevue/card'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Calendar from 'primevue/calendar'
import OrderList from 'primevue/orderlist'
import Menu from 'primevue/menu'
import Steps from 'primevue/steps'
import Button from 'primevue/button'
import MegaMenu from 'primevue/megamenu'
import InputText from 'primevue/inputtext'

import 'primevue/resources/themes/vela-purple/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.css'




const app = createApp(App)
app.use(PrimeVue)

app.component('Menu', Menu)
app.component('Steps', Steps)
app.component('Button', Button)
app.component('MegaMenu', MegaMenu)
app.component('InputText', InputText)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('Card', Card)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('Calendar', Calendar).component('OrderList', OrderList)
app.use(router).mount('#app')
