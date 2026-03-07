<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api' //importerar axios instans för att prata med API

const router = useRouter()

const username = ref('') //reaktiva variabler som är kopplade till förmulärets input
const password = ref('')

const register = async () => {
  //asynkron funktion som körs när man klickar på registrera dig
  try {
    await api.post('/register', {
      //skickar en post förfrågan till register endpoint med användarens input
      username: username.value,
      password: password.value,
    })

    alert('Konto skapat. Du kan nu logga in')

    router.push('/') //vid lykcad registrering skicka användaren till inloggningssidan
  } catch (error) {
    const errorText = error.response?.data?.error || 'Kunde inte registrera användare försök igen' //fångar upp specifika fel från backenenden till exempel användaren är upptagen annars visas ett standardfel
    alert(errorText)
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card-body p-4">
          <h2 class="text-center mb-4">Skapa konto</h2>

          <form @submit.prevent="register">
            <!-- prevent så att sidan inte laddas om-->
            <div class="mb-3">
              <label for="username" class="form-label">Välj användarnamn</label>
              <input type="text" id="username" class="form-control" v-model="username" required />
              <!-- vmodel skapar en tvåvägsbindning, om användaren skriver här uppdateras varabeln username automatiskt-->
            </div>

            <div class="mb-4">
              <label for="password" class="form-label">Välj lösenord</label>
              <input
                type="password"
                id="password"
                class="form-control"
                v-model="password"
                required
              />
            </div>

            <button type="submit" class="btn btn-primary w-100">Registrera dig</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
