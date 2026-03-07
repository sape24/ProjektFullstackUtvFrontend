<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

const username = ref('')
const password = ref('')

const login = async () => {
  //asynkron funktion som körs när formuläret skickas
  try {
    const response = await api.post('/login', {
      //Skickar användaruppgifter till backend för att logga in
      username: username.value,
      password: password.value,
    })

    localStorage.setItem('token', response.data.token) //sparar JWT token från backend i localstorage
    router.push('/products')
  } catch (error) {
    const errorText = error.response?.data?.error || 'Fel lösenord eller användarnamn'

    alert(errorText)
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card-body p-4">
          <h2 class="text-center mb-4">Logga in</h2>

          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label">Användarnamn</label>
              <input type="text" id="username" class="form-control" v-model="username" required />
            </div>

            <div class="mb-4">
              <label for="password" class="form-label">Lösenord</label>
              <input
                type="password"
                id="password"
                class="form-control"
                v-model="password"
                required
              />
            </div>

            <button type="submit" class="btn btn-primary w-100">Logga in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
