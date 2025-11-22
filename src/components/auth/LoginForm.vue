<template>
  <div class="digi-bg">
    <div class="digi-container">
      <div class="digi-header">
        <div class="digi-logo">DigiPortal</div>
        <div class="digi-sub">Conecta con tu compañero digital</div>
      </div>

      <q-card class="digi-card q-pa-lg">
        <q-form @submit.prevent="onSubmit" ref="formRef">
          <div class="inputs">
            <q-input
              v-model="email"
              label="Email"
              type="email"
              :rules="[(val) => !!val || 'Email requerido']"
              dense
              autofocus
              class="digi-input"
            />

            <q-input
              v-model="password"
              label="Contraseña"
              type="password"
              :rules="[(val) => !!val || 'Contraseña requerida']"
              dense
              class="digi-input"
            />
          </div>

          <div class="actions row items-center q-mt-md">
            <div class="col">
              <q-btn
                label="Ingresar"
                type="submit"
                color="primary"
                :loading="loading"
                unelevated
                class="digi-btn"
              />
            </div>
          </div>
        </q-form>

        <div v-if="error" class="error-msg q-mt-sm">{{ error }}</div>
      </q-card>

      <div class="digi-footer">¿Nuevo aquí? Regístrate y conoce tu compañero digital.</div>
    </div>
    <div class="digi-overlay"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signin } from '../../services/auth'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'

const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const formRef = ref(null)

async function onSubmit() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Completa email y contraseña'
    return
  }

  loading.value = true
  try {
    const data = await signin(email.value, password.value)
    if (data.token) localStorage.setItem('token', data.token)
    // save user payload if provided
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user))
    try {
      Notify.create({ type: 'positive', message: 'Login exitoso' })
    } catch (e) {
      console.warn('Notify not available:', e)
    }
    // navigate to home page after login
    router.push('/home').catch(() => {})
  } catch (err) {
    console.error('Login error:', err)
    let msg = 'Error al iniciar sesión'
    if (err.response && err.response.data && err.response.data.message)
      msg = err.response.data.message
    error.value = msg
    try {
      Notify.create({ type: 'negative', message: msg })
    } catch (e) {
      console.warn('Notify not available:', e)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
:root {
  --digi-bg-1: #0b1020;
  --digi-bg-2: #001022;
  --accent-1: #ffd24a; /* warm yellow */
  --accent-2: #4ad8ff; /* cyan */
  --accent-3: #b76bff; /* purple */
}

.digi-bg {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 32px;
  background: linear-gradient(180deg, var(--digi-bg-1) 0%, var(--digi-bg-2) 100%);
  overflow: hidden;
}

.digi-overlay {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size:
    40px 40px,
    1px 100%;
  mix-blend-mode: overlay;
}

.digi-container {
  z-index: 2;
  width: 100%;
  max-width: 460px;
  text-align: center;
}

.digi-header {
  margin-bottom: 18px;
  color: var(--accent-2);
  text-shadow:
    0 0 10px rgba(74, 216, 255, 0.12),
    0 0 20px rgba(183, 107, 255, 0.06);
}

.digi-logo {
  font-weight: 800;
  font-size: 28px;
  color: var(--accent-1);
  letter-spacing: 1px;
  text-transform: uppercase;
  background: linear-gradient(90deg, var(--accent-1), var(--accent-3));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 6px 14px rgba(183, 107, 255, 0.08));
}

.digi-sub {
  margin-top: 4px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.digi-card {
  backdrop-filter: blur(6px) saturate(120%);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(74, 216, 255, 0.08);
  box-shadow:
    0 8px 30px rgba(2, 6, 23, 0.6),
    0 0 40px rgba(183, 107, 255, 0.04) inset;
  border-radius: 12px;
  width: 100%;
}

.inputs {
  display: grid;
  gap: 12px;
}

.digi-input .q-field__control {
  color: #eaf6ff;
}

.digi-input .q-field__label {
  color: rgba(255, 255, 255, 0.7);
}

.digi-btn {
  --q-btn-font-weight: 700;
  background: linear-gradient(90deg, var(--accent-2), var(--accent-3));
  color: #071124;
  border-radius: 8px;
  box-shadow:
    0 8px 24px rgba(74, 216, 255, 0.12),
    0 2px 6px rgba(183, 107, 255, 0.06) inset;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;
}

.digi-btn:hover {
  transform: translateY(-2px);
}

.error-msg {
  color: #ff6b6b;
  font-size: 13px;
  text-align: left;
}

.digi-footer {
  margin-top: 14px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 600px) {
  .digi-container {
    padding: 0 12px;
  }
  .digi-logo {
    font-size: 22px;
  }
}
</style>
