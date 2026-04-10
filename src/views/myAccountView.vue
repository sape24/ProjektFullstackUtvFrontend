<script setup>
import { useRouter } from 'vue-router'
import AccountForm from '@/components/accountFormComponent.vue'

const router = useRouter()

const handleAccountDeleted = () => {
  localStorage.removeItem('token')
  router.push('/')
}
</script>
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <!-- använder bootstraps inbyggda flexbox klass för att skapa en rad och centrera innehållet horisontellt-->
      <div class="col-md-6">
        <AccountForm @accountDeleted="handleAccountDeleted" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
