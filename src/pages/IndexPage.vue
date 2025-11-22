<template>
  <q-page class="q-pa-md">
    <LoginForm v-if="!isLogged" @login-success="onLoginSuccess" />
    <template v-else>
      <div class="row items-center q-mb-md">
        <div v-if="errorMsg" class="q-pa-sm bg-red-1 text-red-8 rounded-borders shadow-2 col">
          {{ errorMsg }}
        </div>
        <q-btn color="negative" label="Cerrar sesión" @click="logout" class="q-ml-auto" />
      </div>
      <DigimonFilter :levels="levels" @filter="onFilter" />
      <DigimonList :digimons="filteredDigimons" />
    </template>
    <!-- La función logout solo debe estar en el script, no en el template -->
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import DigimonList from 'components/DigimonList.vue'
import DigimonFilter from 'components/DigimonFilter.vue'
import LoginForm from 'components/LoginForm.vue'
import axios from 'axios'

const digimons = ref([])
const filteredDigimons = ref([])
const levels = ref([])
const errorMsg = ref('')
const isLogged = ref(false)
const userToken = ref('')

const digimonMock = [
  {
    name: 'Agumon',
    img: 'https://digimon.shadowsmith.com/img/agumon.jpg',
    level: 'Rookie',
  },
  {
    name: 'Gabumon',
    img: 'https://digimon.shadowsmith.com/img/gabumon.jpg',
    level: 'Rookie',
  },
  {
    name: 'Patamon',
    img: 'https://digimon.shadowsmith.com/img/patamon.jpg',
    level: 'Rookie',
  },
]

async function fetchDigimons() {
  try {
    const res = await axios.get('https://digimon-api.vercel.app/api/digimon', { timeout: 5000 })
    digimons.value = res.data
    filteredDigimons.value = res.data
    levels.value = [...new Set(res.data.map((d) => d.level))].filter((lvl) => lvl)
    errorMsg.value = ''
  } catch {
    errorMsg.value = 'No se pudo conectar a la API de Digimon. Mostrando datos de ejemplo.'
    digimons.value = digimonMock
    filteredDigimons.value = digimonMock
    levels.value = [...new Set(digimonMock.map((d) => d.level))].filter((lvl) => lvl)
  }
}

function onFilter({ name, level }) {
  filteredDigimons.value = digimons.value.filter((d) => {
    const matchName = name ? d.name.toLowerCase().includes(name.toLowerCase()) : true
    const matchLevel = level ? d.level === level : true
    return matchName && matchLevel
  })
}

function onLoginSuccess(token) {
  isLogged.value = true
  userToken.value = token
  fetchDigimons()
}
</script>
