<template>
  <div>
    <div class="p-m-4">
      <span class="p-float-label">
        <InputText id="asunto" type="text" v-model="asunto" />
        <label for="asunto">Asunto</label>
      </span>
    </div>
    <div class="p-m-4">
      <span class="p-float-label">
        <TextArea
          id="descripcion"
          type="text"
          v-model="descripcion"
          :autoResize="true"
        />
        <label for="descripcion">Descripcion</label>
      </span>
    </div>
    <div class="p-grid p-flex-row-reverse m-4">
      <div class="p-shadow-6 p-m-6">
        <Button label="Siguiente" @click="siguiente" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()
    var asunto = ref()
    var descripcion = ref()
    const siguiente = () => {
      console.log(formObject)
    }
    const formObject = ref({
      asunto,
      descripcion
    })
    return { siguiente, asunto, descripcion, formObject }
  }
})
</script>
