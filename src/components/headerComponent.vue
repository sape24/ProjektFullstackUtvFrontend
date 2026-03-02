<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">Projekt</RouterLink>
        <!-- Routerlink istället för a tagg för att snabbt navigera de olika viewsen-->

        <div class="navbar-nav">
          <RouterLink class="nav-link" to="/">Logga in</RouterLink>
          <RouterLink class="nav-link" to="/register">Registrera</RouterLink>
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
