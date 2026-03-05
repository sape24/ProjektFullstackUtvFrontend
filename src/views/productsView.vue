<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const products = ref([])

const name = ref('')
const description = ref('')
const category = ref('')
const price = ref('')
const stock = ref('')

const getProducts = async () => {
  try {
    const response = await api.get('/products')
    products.value = response.data
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      alert('Din session har gått ut, var vänlig logga in igen.')
      localStorage.removeItem('token')
      router.push('/')
    } else {
      alert('Kunde inte hämta produkter')
    }
  }
}

const addProduct = async () => {
  try {
    await api.post('/products', {
      name: name.value,
      description: description.value,
      category: category.value,
      price: Number(price.value),
      stock: Number(stock.value),
    })

    name.value = ''
    description.value = ''
    category.value = ''
    price.value = ''
    stock.value = ''

    getProducts()
  } catch (error) {
    alert('Kunde inte lägga till produkten')
  }
}

const updateStock = async (product, change) => {
  const newStock = product.stock + change
  if (newStock < 0) return

  try {
    await api.patch(`/products/${product._id}`, {
      stock: newStock,
    })

    product.stock = newStock
  } catch (error) {
    alert('Kunde inte uppdatera lagersaldot')
  }
}

const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`)
    getProducts()
  } catch (error) {
    alert('Kunde inte ta bort produkt')
  }
}

onMounted(() => {
  getProducts()
})
</script>

<template>
  <div class="container mt-5">
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
            <input
              type="number"
              class="form-control"
              v-model="stock"
              placeholder="Antal"
              required
            />
          </div>
          <div class="col-md-2">
            <button type="submit" class="btn btn-success w-100">Lägg till</button>
          </div>
        </form>
      </div>
    </div>

    <h2 class="mb-3">Lagersaldo</h2>
    <div class="card shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0 align-middle">
            <thead class="table-dark">
              <tr>
                <th>Namn</th>
                <th>Beskrivning</th>
                <th>Kategori</th>
                <th>Pris</th>
                <th>Lager</th>
                <th>Hantera</th>
                <th>Ta bort</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product._id">
                <td class="fw-bold">{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.stock }} st</td>
                <td>
                  <div class="d-flex align-items-center">
                    <button
                      class="btn btn-sm btn-outline-secondary me-2 fw-bold"
                      @click="updateStock(product, -1)"
                    >
                      -
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary ms-2 fw-bold"
                      @click="updateStock(product, 1)"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <button class="btn btn-sm btn-danger" @click="deleteProduct(product._id)">
                    Ta bort
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
