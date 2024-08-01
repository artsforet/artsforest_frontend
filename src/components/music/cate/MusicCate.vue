
<template>
  <div class="genre-input-box">
    <div class="genre-box">
      <div class="label">Genre</div>
      <select v-model="selectedGenre" @change="handleChangeGenreOption">
        <optgroup>
          <option value="None">None</option>
          <option value="Custom">Custom</option>
        </optgroup>
        <optgroup label="Music">
          <option v-for="item in genreList" :key="item.label" :value="item.label">
            {{ item.label }}
          </option>
        </optgroup>
      </select>
    </div>
    <div v-if="selectedGenre === 'Custom'" class="genre-box" style="margin-top: auto;">
      <input
          type="text"
          id="genre"
          v-model="customGenre"
          @input="handleChangeCustomGenre"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const genreList = [
  { label: 'Rock' },
  { label: 'Pop' },
  { label: 'Jazz' },
  // Add more genres as needed
];

const selectedGenre = ref('None');
const customGenre = ref('');

const handleChangeGenreOption = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  selectedGenre.value = target.value;
  if (selectedGenre.value !== 'Custom') {
    customGenre.value = '';
  }
};

const handleChangeCustomGenre = (event: Event) => {
  const target = event.target as HTMLInputElement;
  customGenre.value = target.value;
};
</script>

<style scoped>
.genre-input-box {
  /* Add your styles here */
}

.genre-box {
  /* Add your styles here */
}

.label {
  /* Add your styles here */
}
</style>
