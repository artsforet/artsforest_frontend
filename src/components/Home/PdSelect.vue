<template>
  <div class="song-list-container">
    <div class="song-list">
      <h3 style="color: white; height: 20px; font-weight: 600">PD의 선택</h3>
      <div v-for="(song, index) in songs" :key="index" class="song-item">
        <img :src="song.image" class="song-image" />
        <div class="song-info">
          <div class="song-title">{{ song.title }}</div>
          <div class="song-album">{{ song.album }}</div>
          <div class="song-meta">
            <span class="song-length">길이 {{ song.length }}</span>
            <span class="song-bpm">템포 {{ song.bpm }} BPM</span>
          </div>
        </div>
        <div class="button-custom">
          <i class="bi bi-play-fill"></i>
          <!-- <i class="bi bi-three-dots menu-button"></i> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [
        {
          image: "https://swiperjs.com/demos/images/nature-1.jpg",
          title: "도로옆 해변이 보인다",
          album: "여름이다! 해변으로 떠나자! [여행 Vlog Type Vol. 3]",
          length: "01:59",
          bpm: 96,
        },
        {
          image: "https://swiperjs.com/demos/images/nature-1.jpg",
          title: "폭풍 치는 더위",
          album: "여름이다! 해변으로 떠나자! [여행 Vlog Type Vol. 3]",
          length: "01:54",
          bpm: 120,
        },
        {
          image: "https://swiperjs.com/demos/images/nature-1.jpg",
          title: "물속으로 뛰어",
          album: "여름이다! 해변으로 떠나자! [여행 Vlog Type Vol. 3]",
          length: "02:00",
          bpm: 138,
        },
        {
          image: "https://swiperjs.com/demos/images/nature-1.jpg",
          title: "Moon dance",
          album: "자기전 듣는 수면 BGM 끝판왕 [Lofi & Chill Beat Vol. 9]",
          length: "02:09",
          bpm: 70,
        },
        {
          image: "https://swiperjs.com/demos/images/nature-1.jpg",
          title: "Sweet home",
          album: "자기전 듣는 수면 BGM 끝판왕 [Lofi & Chill Beat Vol. 9]",
          length: "02:10",
          bpm: 76,
        },
        {
          image: "https://swiperjs.com/demos/images/nature-1.jpg",
          title: "Dust wind",
          album: "자기전 듣는 수면 BGM 끝판왕 [Lofi & Chill Beat Vol. 9]",
          length: "02:17",
          bpm: 87,
        },
        {
          image: "https://swiperjs.com/demos/images/nature-1.jpg",
          title: "Groove with Beer",
          album: "낭만의 맥주 축제 현장 [여행 Vlog Type Vol. 2]",
          length: "02:00",
          bpm: 130,
        },
        {
          image: "https://swiperjs.com/demos/images/nature-1.jpg",
          title: "분위기에 취한다",
          album: "낭만의 맥주 축제 현장 [여행 Vlog Type Vol. 2]",
          length: "02:13",
          bpm: 163,
        },
        {
          image: "https://swiperjs.com/demos/images/nature-1.jpg",
          title: "여름의 시작",
          album: "일년 중 가장 긴 하루, 하지 [6월의 하지]",
          length: "02:04",
          bpm: 130,
        },
        {
          image: "https://swiperjs.com/demos/images/nature-1.jpg",
          title: "일출 시간",
          album: "일년 중 가장 긴 하루, 하지 [6월의 하지]",
          length: "01:54",
          bpm: 60,
        },
      ],
    };
  },
};
</script>

<style scoped>
.song-list-container {
  width: 100%;
  background-color: black;
  padding: 20px;
  padding-bottom: 200px;
  box-sizing: border-box;
  margin: 0 auto;
}

h3 {
  width: 100%;
  color: white;
  margin-bottom: 20px;
}

.song-list {
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin: 0 auto;
}

.song-item {
  width: 580px;
  display: flex;
  align-items: center;
  padding-top: 20px;
  margin: 10px 0;
}

.song-image {
  width: 75px;
  height: 75px;
  margin-right: 20px;
  margin-top: 10px;
}

.song-info {
  color: white;
  text-align: start;
  flex-grow: 1;
  font-size: 15px;
}

.song-title {
  font-weight: bold;
}

.song-album {
  color: gray;
  margin-top: 5px;
}

.song-meta {
  display: flex;
  margin-top: 5px;
  color: #f0a500;
  align-items: center;
  margin-bottom:-20px;
}

.song-meta span {
  margin-right: 10px;
}

.button-custom {
  font-size: 30px;
  color: white;
  cursor: pointer;
}
</style>
