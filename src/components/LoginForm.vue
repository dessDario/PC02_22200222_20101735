<template>
  <div class="login-form">
    <q-card class="q-pa-md" style="max-width: 400px; margin: auto">
      <q-card-section>
        <div class="text-h6">Iniciar sesión</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="email" label="Email" type="email" outlined dense />
        <q-input
          v-model="password"
          label="Contraseña"
          type="password"
          outlined
          dense
          class="q-mt-md"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Ingresar" @click="login" :loading="loading" />
      </q-card-actions>
      <q-card-section v-if="errorMsg" class="text-negative">
        {{ errorMsg }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { defineEmits } from 'vue'

const emit = defineEmits(['login-success'])
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

async function login() {
  errorMsg.value = ''
  loading.value = true
  try {
    const res = await axios.post('https://storedb-api.onrender.com/node-api/users/signin', {
      email: email.value,
      password: password.value,
    })
    if (res.data && res.data.token) {
      emit('login-success', res.data.token)
    } else {
      errorMsg.value = 'Credenciales incorrectas.'
    }
  } catch {
    errorMsg.value = 'Error al iniciar sesión.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
</style>
