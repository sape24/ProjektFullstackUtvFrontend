<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

const username = ref('')
const newPassword = ref('')

const getProfile = async () => {
  try {
    const response = await api.get('/users/me')
    username.value = response.data.username //fyller i det nuvarande namnet i formuläret
  } catch (error) {
    if (error.response && error.response.status === 401) {
      //kollar om felet beror på att token har gått ut med status 401
      alert('Din session har gått ut. Logga in igen')
      localStorage.removeItem('token') //rensar ogiltig token
      router.push('/')
    } else {
      alert('Kunde inte hämta din profil')
    }
  }
}
const updateProfile = async () => {
  //funktion för att uppdatera profilen
  try {
    const updateData = {}

    if (username.value) {
      //uppdaterar bara lösenord och användarnamn om fälten inte är tomma
      updateData.username = username.value
    }

    if (newPassword.value) {
      updateData.password = newPassword.value
    }

    await api.patch('/users/me', updateData)

    alert('Profilen har uppdaterats')
    newPassword.value = ''
    getProfile()
  } catch (error) {
    alert('Kunde inte uppdatera profile: ' + error.message)
  }
}

const deleteAccount = async () => {
  //funktion för att radera konto
  const confirmDelete = confirm('Är du säker att du vill radera kontot?')

  if (!confirmDelete) {
    //avbryt funbktion om användaren klickar på avbryt
    return
  }

  try {
    await api.delete('/users/me')
    alert('Ditt konto har raderats')
    localStorage.removeItem('token')
    router.push('/')
  } catch (error) {
    alert('Kunde inte radera kontot: ' + error.message)
  }
}

onMounted(() => {
  //hämtar profilen automatiskt när sidan visas
  getProfile()
})
</script>
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <!-- använder bootstraps inbyggda flexbox klass för att skapa en rad och centrera innehållet horisontellt-->
      <div class="col-md-6">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <h3 class="mb-4">Mitt konto</h3>
            <form @submit.prevent="updateProfile">
              <div class="mb-3">
                <label class="form-label fw-bold">Användarnamn</label>
                <input type="text" class="form-control" v-model="username" required />
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Nytt lösenord</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="newPassword"
                  placeholder="Lämna tomt om du inte vill byta"
                />
              </div>

              <button type="submit" class="btn btn-primary w-100 fw-bold">Spara ändringar</button>
            </form>
          </div>
        </div>

        <div class="card border-danger shadow-sm">
          <div class="card-body text-center">
            <p>Om du raderar ditt konto kommer du förlora åtkomst till lagersystemet</p>

            <button class="btn btn-outline-danger" @click="deleteAccount">Radera mitt konto</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
