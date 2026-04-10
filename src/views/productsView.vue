<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import ProductForm from '@/components/productFormComponent.vue'
import ProductTable from '@/components/productTableComponent.vue'

const router = useRouter()
const products = ref([]) //tom reaktiv array där alla produkter sparas

const getProducts = async () => {
  //funktion för att hämta ala produkter
  try {
    const response = await api.get('/products')
    products.value = response.data //fyller array med produkter från backend
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      //om token är ogiltigt eller gått ut rensa inloggning och skicka till startsidan
      alert('Din session har gått ut, var vänlig logga in igen.')
      localStorage.removeItem('token')
      router.push('/')
    } else {
      alert('Kunde inte hämta produkter')
    }
  }
}

const updateStock = async (product, change) => {
  //funktion för att öka/minska lagersaldot
  const newStock = product.stock + change //plusar eller drar ifrån värdet vi skickade med till exempel 1 eller -1
  if (newStock < 0) return //förhindrar att lagersaltod blir mindre än 1

  try {
    await api.patch(`/products/${product._id}`, {
      //skickar patch förfrågan för rätt produkt med hjälp av id
      stock: newStock,
    })

    product.stock = newStock //uppdaterar salod direkt så man slipper ladda om hela sidan
  } catch (error) {
    alert('Kunde inte uppdatera lagersaldot')
  }
}

const deleteProduct = async (id) => {
  //funktion för att radera en produkt
  try {
    await api.delete(`/products/${id}`)
    getProducts()
  } catch (error) {
    alert('Kunde inte ta bort produkt')
  }
}

onMounted(() => {
  //kör getProducts automatiskt så fort sidan laddas
  getProducts()
})
</script>

<template>
  <div class="container mt-5">
    <ProductForm @productAdded="getProducts" />
    <h2 class="mb-3">Lagersaldo</h2>
    <ProductTable :products="products" @updateStock="updateStock" @deleteProduct="deleteProduct" />
  </div>
</template>

<style scoped></style>
