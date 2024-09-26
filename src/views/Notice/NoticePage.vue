<script setup>
import { ref } from "vue"

const dummy = ref([
    {id: 0, title: "공지 제목", description: "공지 내용"}
])
</script>
<template>

<div class="notice-page-container">
    <table>
        <thead>
            <tr>
                <td> index </td>
                <td> 공지 제목 </td>
                <td> 공지 내용 </td>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in dummy" :key="item.id"> 
                <td> {{ item.id }} </td>
                <td> {{ item.title }} </td>
                <td> {{ item.description }}</td>
            </tr>
        </tbody>
    </table>

</div>
</template>

<style>
.notice-page-container {
    width: 100%;
    height: 1020px;
    background-color: black;color: green;
}

</style>