<template>
  <div class="page-login q-pa-md q-gutter-md flex flex-center">
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from 'components/auth/LoginForm.vue'
</script>

<style scoped>
.page-login {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
