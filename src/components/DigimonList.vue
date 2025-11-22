<template>
  <div class="digimon-list">
    <div v-for="digimon in digimons" :key="digimon.name" class="digimon-card">
      <div class="digimon-img-container">
        <img :src="digimon.img" :alt="digimon.name" class="digimon-img" />
      </div>
      <div class="digimon-info">
        <h3 class="digimon-name" :title="digimon.name">{{ digimon.name }}</h3>
        <span class="digimon-level">Nivel: {{ digimon.level }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  digimons: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.digimon-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}
.digimon-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  padding: 1.2rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  transition: transform 0.2s;
  position: relative;
  overflow: hidden;
}
.digimon-card:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}
.digimon-img-container {
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.7rem;
  background: #f5f5f5;
  border-radius: 50%;
  overflow: hidden;
}
.digimon-img {
  width: 90px;
  height: 90px;
  object-fit: contain;
}
.digimon-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.digimon-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1976d2;
  margin: 0 0 0.3rem 0;
  text-align: center;
  word-break: break-word;
  max-width: 100%;
  overflow-wrap: anywhere;
}
.digimon-level {
  font-size: 0.95rem;
  color: #555;
  background: #e3f2fd;
  border-radius: 6px;
  padding: 0.2rem 0.7rem;
  margin-bottom: 0.2rem;
}
</style>
