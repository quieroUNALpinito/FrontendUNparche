import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import PrimeVue from 'primevue/config'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Card from 'primevue/card'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Calendar from 'primevue/calendar'
import OrderList from 'primevue/orderlist'

const app = createApp(App)
app.use(PrimeVue)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('Card', Card)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('Calendar', Calendar).component('OrderList', OrderList)
app.use(router).mount('#app')
