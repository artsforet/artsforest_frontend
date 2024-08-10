<template>
  <div class="upload-music-container">
    <div class="upload-music-wrap">
      <h2>음악 업로드</h2>
      <form @submit.prevent="uploadMusic" class="upload-form">
        <div class="form-group-mp3" style="display: flex">
          <label class="input-file-button" style="display: flex">
            <i class="fa fa-upload"></i> Select MP3 files
            <input
              type="file"
              class="mp3-upload"
              ref="music"
              accept="audio/*"
              @change="handleMultipleMusicFileChange"
              multiple
            />
          </label>
          <button type="button" class="add-file-button" @click="addMusicFile">+</button>
        </div>

        <div class="form-group">
          <label for="covers" class="input-file-button">
            <i class="fa fa-upload"></i> 
            Select image file
          </label>
          <input
            type="file"
            ref="covers"
            accept="image/*"
            class="mp3-upload"
            @change="handleCoverFileChange"
            id="covers"
          />
          <!-- <span v-if="coverFilename" class="file-list">Selected cover: {{ coverFilename }}</span> -->
        </div>

        <div class="music-list">
          <h4 style="color: white">입력할 노래 데이터를 선택해주세요.</h4>
          <ul>
            <li
              v-for="(filename, index) in musicFilenames"
              :key="index"
              @click="selectSong(index)"
              :class="{ selected: selectedSongIndex === index }"
              style="width:956px"
            >
              {{ filename }}
            </li>
          </ul>
        </div>
  <div v-if="selectedSongIndex !== null" class="song-form">
    <h3> {{selectedSong }} </h3>
    <div class="metadata-form">
      <div class="metadata-form-group">
        <label for="title">곡 명</label>
        <input type="text" id="title" v-model="musicData[selectedSongIndex].title" required />
      </div>

      <!-- <div class="metadata-form-group">
        <label for="permalink">Permalink</label>
        <input type="text" id="permalink" v-model="musicData[selectedSongIndex].permalink" required />
      </div> -->

      <div class="metadata-form-group">
        <label for="description">정보</label>
        <input type="text" id="description" v-model="musicData[selectedSongIndex].description" />
      </div>

      <div class="metadata-form-group category-group">
        <label for="category">카테고리</label>
        <select id="category" v-model="musicData[selectedSongIndex].selectedCategories" size=1>
          <option v-for="category in musicGenres" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
 
      <div class="metadata-form-group category-group">
        <label for="category">시리즈</label>
        <select id="category" v-model="musicData[selectedSongIndex].selectedAlbumseries" size=1>
          <option v-for="category in albumSeries" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="metadata-form-group">
        <label for="tags">태그</label>
        <input type="text" id="tags" v-model="musicData[selectedSongIndex].tags" />
      </div>

      <div class="metadata-form-group">
        <label for="album">Album</label>
        <input type="text" id="album" v-model="musicData[selectedSongIndex].album" />
      </div>

      <div class="metadata-form-group">
        <label for="artist">Artist</label>
        <input type="text" id="artist" v-model="musicData[selectedSongIndex].artist" />
      </div>

      <div class="metadata-form-group">
        <label for="albumartist">Album Artist</label>
        <input type="text" id="albumartist" v-model="musicData[selectedSongIndex].albumartist" />
      </div>

      <div class="metadata-form-group">
        <label for="atomsphare">Atmosphere</label>
        <input type="text" id="atomsphare" v-model="musicData[selectedSongIndex].atomsphare" />
      </div>

      <div class="metadata-form-group">
        <label for="mood">Mood</label>
        <input type="text" id="mood" v-model="musicData[selectedSongIndex].mood" />
      </div>

      <div class="metadata-form-group">
        <label for="instrument">Instrument</label>
        <input type="text" id="instrument" v-model="musicData[selectedSongIndex].instrument" />
      </div>

      <div class="metadata-form-group">
        <label for="year">발매일</label>
        <input type="date" id="year" v-model="musicData[selectedSongIndex].year" />
      </div>
    </div>
  </div>

  <button type="submit" class="upload-button" :disabled="!canUpload" style="margin-top:50px;">Upload</button>
      </form>
      <div v-if="uploadSuccess" class="success-message">
        Upload successful!
      </div>
    </div>
  </div>
</template>


<script>
import { musicGenres } from '@/genre.js';
import { albumSeries } from '@/series.js';
import axios from 'axios';

export default {
  data() {
    return {
      musicData: [],
      musicGenres,
      albumSeries,
      musicFilenames: [],
      coverFilename: '',
      selectedSongIndex: null,
      uploadSuccess: false,
      selectedFiles: [],
    };
  },
  computed: {
    canUpload() {
      return this.coverFilename !== '';
    }
  },
  methods: {
    addTaags(){
      this.formData.tags = JSON.stringify(tagsArray);
    },
    selectSong(index) {
      this.selectedSongIndex = index;
      this.selectedSong = this.musicFilenames[index]; // Add this line
    },
    addMusicFile() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'audio/*';
      input.multiple = true;
      input.style.display = 'none';
      input.addEventListener('change', this.handleAdditionalMusicFileChange);
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    },
    handleAdditionalMusicFileChange(event) {
      const files = Array.from(event.target.files);
      this.selectedFiles.push(...files);
      const newFilenames = files.map(file => file.name);
      this.musicFilenames = [...this.musicFilenames, ...newFilenames];
      const newMusicData = files.map(file => ({
        title: '',
        permalink: '',
        duration: 0,
        category: [],
        series: [],
        tags: [],
        description: '',
        artist: '',
        albumartist: '',
        atomsphare: '',
        mood: '',
        instrument: '',
        year: null,
        selectedCategories: [],
        selectedAlbumseries: []
      }));
      this.musicData = [...this.musicData, ...newMusicData];
      files.forEach((file, index) => {
        const adjustedIndex = this.musicData.length - files.length + index;
        this.extractDuration(file, adjustedIndex);
      });
    },
    
    selectSong(index) {
      this.selectedSongIndex = index;
    },
    handleMultipleMusicFileChange(event) {
      const files = Array.from(event.target.files);
      this.selectedFiles = files;
      this.musicFilenames = files.map(file => file.name);
      this.musicData = files.map(file => ({
        title: '',
        permalink: '',
        duration: 0,
        album: '',
        category: [],
        series: [],
        tags: [],
        description: '',
        artist: '',
        albumartist: '',
        atomsphare: '',
        mood: '',
        instrument: '',
        year: null,
        selectedCategories: [],
        tempo: 0,
      }));
      files.forEach((file, index) => {
        this.extractDuration(file, index),
        this.extractTempo(file, index)
      });

      if (files.length > 0) {
        this.selectedSongIndex = 0;
      }
    },
    handleCoverFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.coverFilename = file.name;
      }
    },
    extractDuration(file, index = 0) {
      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener('loadedmetadata', () => {
        this.musicData[index].duration = Math.round(audio.duration);
        // Force reactivity update
        this.musicData = [...this.musicData];
      });
    },
      extractTempo(file, index = 0) {
          // Placeholder for tempo extraction logic
          // This would typically use audio analysis libraries or custom logic
          // Here, we're just setting a dummy value
          this.musicData[index].tempo = Math.floor(Math.random() * 150) + 50; // Random tempo for demonstration
          this.musicData = [...this.musicData];
        },

  async uploadMusic() {
    const coversFile = this.$refs.covers.files[0];
    const formData = new FormData();

    this.selectedFiles.forEach((file, index) => {
      const musicEntry = { ...this.musicData[index] };
      musicEntry.category = musicEntry.selectedCategories;
      musicEntry.series = musicEntry.selectedAlbumseries;

      // Ensure tags is an array
      if (typeof musicEntry.tags === 'string') {
        musicEntry.tags = musicEntry.tags.split(',').map(tag => tag.trim());
      }

      // Append the entire musicEntry object as JSON
      formData.append('musics', file);
      formData.append('datas', new Blob([JSON.stringify(musicEntry)], { type: 'application/json' }));
    });

    if (coversFile) {
      formData.append('cover', coversFile);
    }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.post('http://localhost:80/music/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    alert("업로드가 완료 되었습니다.");
    
    if (response.status === 200) {
      this.uploadSuccess = true;
    } else {
      console.error('Upload failed with status:', response.status);
    }
  } catch (error) {
    console.error('Upload failed:', error);
  }
},
  },
};
</script>
<style scoped>
.form-group-mp3 {
  width: 300px;
  color: white;
}

.upload-music-container {
  width: 100%;
  margin: auto;
  padding-top: 50px;
  color: white;
  background-color: #212121;
}

.upload-music-wrap {
  width: 1196px;
  margin: 0 auto;
}

.upload-form {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.form-group {
  width: 300px;
}
.form-group,
.metadata-form-group {
  display: flex;
  flex-direction: column;
  font-weight: 600;
}

.metadata-form-group label,
.form-group label {
  margin-bottom: 5px;
  font-weight: 600;
}

.metadata-form-group input,
.metadata-form-group select,
.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  font-weight: 700;
}

iinput::placeholder {
    color: blue;
    font-size: 1.2em;
    font-style: italic;
    font-weight: bold;
    text-align: center;
}
.input-file-button {
  color: white;
}

.add-file-button {
  margin-left:5px;
}
.input-file-button,
.add-file-button,
.upload-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f3be38;
  color: #555;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}

.input-file-button:hover,
.add-file-button:hover,
.upload-button:hover {
  opacity: 0.7;
}

.file-list {
  margin-top: 5px;
  color: #555;
}

.music-list {
  grid-column: span 4;
  margin-top: 20px;
}

.music-list h3 {
  color: #f3be38;
}

.music-list ul {
  list-style-type: none;
  padding: 0;
}

.music-list li {
  padding: 10px;
  margin-bottom: 5px;
  background-color: #f3be38;
  color: #454545;
  font-weight: 800;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.6;
}

.music-list li.selected {
  opacity: 1;
}

.song-form {
  grid-column: span 4;
  margin-top: 20px;
  border-radius: 10px;
}

.metadata-form {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  float: left;
}

.metadata-form-group.category-group {
  height: 50px;
}

.metadata-form-group {
  display: flex;
  flex-direction: column;
}

.success-message {
  grid-column: span 4;
  text-align: center;
  color: green;
  margin-top: 20px;
}

#category {
  width: 100%;
  height: 100px;
}
.mp3-upload {
  display: none;
}
</style>