<script setup>
import { ref } from 'vue'
import api from '@/services/api'

const emit = defineEmits(['productAdded'])

const name = ref('') //reaktiva variabler för lägg till produkt formuläret
const description = ref('')
const category = ref('')
const price = ref('')
const stock = ref('')

const addProduct = async () => {
  try {
    await api.post('/products', {
      name: name.value,
      description: description.value,
      category: category.value,
      price: Number(price.value), //säkertställer att pris skickas som nummer och inte text
      stock: Number(stock.value),
    })

    name.value = '' //tömmer formuläret
    description.value = ''
    category.value = ''
    price.value = ''
    stock.value = ''

    emit('productAdded')
  } catch (error) {
    alert('Kunde inte lägga till produkten')
  }
}
</script>

<template>
  <div class="card shadow-sm mb-5">
    <div class="card-body">
      <h4 class="mb-3">Lägg till ny produkt</h4>
      <form @submit.prevent="addProduct" class="row g-3">
        <div class="col-md-2">
          <input type="text" class="form-control" v-model="name" placeholder="Namn" required />
        </div>
        <div class="col-md-3">
          <input
            type="text"
            class="form-control"
            v-model="description"
            placeholder="Beskrivning"
            required
          />
        </div>
        <div class="col-md-2">
          <input
            type="text"
            class="form-control"
            v-model="category"
            placeholder="Kategori"
            required
          />
        </div>
        <div class="col-md-2">
          <input
            type="number"
            class="form-control"
            v-model="price"
            placeholder="Pris (Kr)"
            required
          />
        </div>
        <div class="col-md-1">
          <input type="number" class="form-control" v-model="stock" placeholder="Antal" required />
        </div>
        <div class="col-md-2">
          <button type="submit" class="btn btn-success w-100">Lägg till</button>
        </div>
      </form>
    </div>
  </div>
</template>
