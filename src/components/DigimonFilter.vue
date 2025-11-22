<template>
  <div class="digimon-filter">
    <input v-model="name" type="text" placeholder="Filtrar por nombre" class="filter-input" />
    <select v-model="level" class="filter-select">
      <option value="">Todos los niveles</option>
      <option v-for="lvl in levels" :key="lvl" :value="lvl">
        {{ lvl }}
      </option>
    </select>
    <button @click="emitFilter" class="filter-btn">Filtrar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  levels: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['filter'])
const name = ref('')
const level = ref('')

function emitFilter() {
  emit('filter', { name: name.value, level: level.value })
}
</script>

<style scoped>
.digimon-filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.filter-input,
.filter-select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.filter-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
