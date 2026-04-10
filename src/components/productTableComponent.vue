<script setup>
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['updateStock', 'deleteProduct'])
</script>
<template>
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
              <!-- v-for loopar igenom hela array och skapar en ny tabellrad för varje produkt, använder key så vue kan hålla isär raderna-->
              <td class="fw-bold">{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stock }} st</td>
              <td>
                <div class="d-flex align-items-center">
                  <button
                    class="btn btn-sm btn-outline-secondary me-2 fw-bold"
                    @click="emit('updateStock', product, -1)"
                  >
                    -
                  </button>
                  <button
                    class="btn btn-sm btn-outline-secondary ms-2 fw-bold"
                    @click="emit('updateStock', product, 1)"
                  >
                    +
                  </button>
                </div>
              </td>
              <td>
                <button class="btn btn-sm btn-danger" @click="emit('deleteProduct', product._id)">
                  Ta bort
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
