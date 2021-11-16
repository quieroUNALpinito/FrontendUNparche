<template>
  <div>
    <h1>Nuevo Evento</h1>
    <Steps :model="items" />
    <Card class="p-m-2 p-shadow-5">
      <template #title> </template>
      <template #content>
        <router-view
          v-slot="{ Component }"
          :formData="formObject"
          @prevPage="prevPage($event)"
          @nextPage="nextPage($event)"
          @complete="complete"
        >
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </template>
    </Card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

export default {
  setup () {
    const router = useRouter()
    const toast = useToast()
    const items = ref([
      { label: 'Basicos', to: '/' },
      { label: 'Configuracion', to: 'configuracion' },
      { label: 'Ubicacion', to: 'ubicacion' },
      { label: 'Confirmacion', to: 'confirmacion' }
    ])
    const formObject = ref({})

    const nextPage = (event) => {
      for (const field in event.formData) {
        formObject.value[field] = event.formData[field]
      }
      router.push(items.value[event.pageIndex + 1].to)
    }

    const prevPage = (event) => {
      router.push(items.value[event.pageIndex - 1].to)
    }

    const complete = () => {
      toast.add({
        severity: 'success',
        summary: 'evento Creado',
        detail: 'succesful'
      })
    }
    return { items, formObject, nextPage, prevPage, complete }
  }
}
</script>
