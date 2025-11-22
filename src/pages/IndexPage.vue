
<template>
  <q-page class="q-pa-md">
    <DigimonFilter :levels="levels" @filter="onFilter" />
    <DigimonList :digimons="filteredDigimons" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DigimonList from 'components/DigimonList.vue';
import DigimonFilter from 'components/DigimonFilter.vue';
import axios from 'axios';

const digimons = ref([]);
const filteredDigimons = ref([]);
const levels = ref([]);

async function fetchDigimons() {
  const res = await axios.get('https://digimon-api.vercel.app/api/digimon');
  digimons.value = res.data;
  filteredDigimons.value = res.data;
  // Extraer niveles únicos
  levels.value = [...new Set(res.data.map(d => d.level))].filter(lvl => lvl);
}

function onFilter({ name, level }) {
  filteredDigimons.value = digimons.value.filter(d => {
    const matchName = name ? d.name.toLowerCase().includes(name.toLowerCase()) : true;
    const matchLevel = level ? d.level === level : true;
    return matchName && matchLevel;
  });
}

onMounted(fetchDigimons);
</script>
