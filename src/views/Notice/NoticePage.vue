<script setup>
import { ref, computed } from 'vue'
// import { getNotice } from '@/api/notice'

const notice = ref([
    {
        id: 1,
        category: '공지사항',
        title: 'BGM팩토리 작곡가 채용 안내',
        date: '2024.06.06',
        views: 168
    },
    {
        id: 2,
        category: '이벤트',
        title: 'BGM팩토리 여름 준비 이용권 20% 할인 이벤트 안내',
        date: '2024.05.29',
        views: 93
    },
    // ... more notices
])

// getNotice().then(res => {
//     notice.value = res.data
// })

const categories = ref(['전체', '공지사항', '이벤트', '언론보도', '저작권정보', '업데이트'])
const selectedCategory = ref('전체')

const filteredNotices = computed(() => {
    if (selectedCategory.value === '전체') {
        return notice.value
    }
    return notice.value.filter(item => item.category === selectedCategory.value)
})
</script>

<template>
    <div class="notice-page">
        <h1>공지사항</h1>
        <div class="categories">
            <span 
                v-for="category in categories" 
                :key="category" 
                :class="{ active: category === selectedCategory.value }" 
                @click="selectedCategory.value = category"
            >
                {{ category }}
            </span>
        </div>
        <div class="notice-list">
            <div v-for="item in filteredNotices" :key="item.id" class="notice-item">
                <span class="category">{{ item.category }}</span>
                <span class="title">{{ item.title }}</span>
                <span class="date">{{ item.date }}</span>
                <span class="views">{{ item.views }}</span>
            </div>
        </div>
        <div class="pagination">
            <span v-for="page in 10" :key="page" :class="{ active: page === 1 }">{{ page }}</span>
        </div>
    </div>
</template>

<style scoped>
.notice-page {
    width: 1194px;
    height: 824px;
    background-color: ##202020;
    height: 100vh;
    color: #fff;
    padding: 20px;
    margin:0 auto;
}

.categories {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.categories span {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
}

.categories .active {
    background-color: #fff;
    color: #333;
}

.notice-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.notice-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #444;
}

.notice-item .category {
    flex: 1;
    color: #aaa;
}

.notice-item .title {
    flex: 4;
    color: #fff;
}

.notice-item .date {
    flex: 2;
    color: #aaa;
}

.notice-item .views {
    flex: 1;
    text-align: right;
    color: #aaa;
}

.pagination {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 20px;
}

.pagination span {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
}

.pagination .active {
    background-color: #fff;
    color: #333;
}
</style>