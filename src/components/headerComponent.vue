<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isLoggedIn = ref(false) //reaktiv variabel som håller kolla på om användaren är inloggad eller inte

watch(
  //watch övervakar route varje gång användaren byter sida körs denna kod
  route,
  () => {
    if (localStorage.getItem('token')) {
      //kolla om det finns en token i localstorage, finns den är användaren inloggad annars inte
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  },
  { immediate: true }, //Gör så att kollen körs direkt när headern laddas in första gången
)

const logout = () => {
  //funktion för att logga ut
  localStorage.removeItem('token')
  isLoggedIn.value = false //uppdaterar menyn så att utloggadlänkarna visas igen
  router.push('/')
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">Projekt</RouterLink>
        <!-- Routerlink istället för a tagg för att snabbt navigera de olika viewsen-->

        <div class="navbar-nav">
          <template v-if="!isLoggedIn">
            <!-- v-if ser till att länkarna för logga in och registrera enbart visas om användaren saknar giltig token-->
            <RouterLink class="nav-link" to="/">Logga in</RouterLink>
            <RouterLink class="nav-link" to="/register">Registrera</RouterLink>
          </template>

          <template v-if="isLoggedIn">
            <!-- v-if ser till att länkarna för lagersystemet och mitt konto enbart visas om användaren har en giltig token-->
            <RouterLink class="nav-link" to="/products">Lagersystem</RouterLink>
            <RouterLink class="nav-link" to="/myaccount">Mitt konto</RouterLink>
            <button class="nav-link btn btn-link" @click="logout">Logga ut</button>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* scoped så denna CSS enbart används på denna komponent*/
.navbar {
  background-color: rgb(12, 201, 235);
  padding: 1%;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.nav-link {
  font-size: 25px;
  color: white;
}

.navbar-brand {
  font-size: 30px;
}
</style>
