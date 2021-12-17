import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'primevue/resources/themes/vela-purple/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.css'
import './assets/styles/layout.scss'

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
import Dropdown from 'primevue/dropdown'
import InputSwitch from 'primevue/inputswitch'
import Calendar from 'primevue/calendar'
import InputNumber from 'primevue/inputnumber'
import ToggleButton from 'primevue/togglebutton'
import OrderList from 'primevue/orderlist'
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'
import InlineMessage from 'primevue/inlinemessage'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Avatar from 'primevue/avatar'
import Menubar from 'primevue/menubar'
import Dialog from 'primevue/dialog'
import Image from 'primevue/image'
import Badge from 'primevue/badge'
import BadgeDirective from 'primevue/badgedirective'
import OverlayPanel from 'primevue/overlaypanel'
import Fieldset from 'primevue/fieldset'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'

const app = createApp(App)

app.use(VueAxios, axios)
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
app.component('InputSwitch', InputSwitch)
app.component('Calendar', Calendar)
app.component('InputNumber', InputNumber)
app.component('ToggleButton', ToggleButton)
app.component('OrderList', OrderList)
app.component('Checkbox', Checkbox)
app.component('Message', Message)
app.component('InlineMessage', InlineMessage)
app.component('Avatar', Avatar)
app.component('Menubar', Menubar)
app.component('Dialog', Dialog)
app.component('Image', Image)
app.component('Badge', Badge)
app.component('OverlayPanel', OverlayPanel)
app.component('Fieldset', Fieldset)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)

const gauthClientId =
  '832086360772-parslg4nd9jl5shdoats8rhucep5tmfv.apps.googleusercontent.com'
app.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: 'email',
  prompt: 'consent',
  fetch_basic_profile: true
})
app.use(router)
app.use(ToastService)
app.directive('badge', BadgeDirective)
app.mount('#app')
