<template>
    <content-section class="!flex-nowrap">

        <div class="flex flex-col justify-center my-2 mb-5 ml-auto">
            <search-bar :searchType="false" class="flex" />
            <div class="flex justify-center my-2 mb-5 ml-auto">
                <h2 class="text-sm font-light px-4 py-2">검색 결과</h2>
                <p class="text-gray-600 px-4 py-2">검색 건수 : {{ dataInfo.length || 0 }} 권</p>
                <!-- <button @click="$router.push('/')" class="bg-blue-500 text-blue px-4 py-2 rounded">홈으로</button> -->
            </div>
        </div>

        <div v-if="dataInfo.length" class="books-grid">
            <div v-for="data in dataInfo" :key="data.isbn" class="book-card">
                <img :src="data.thumbnail" alt="Book Thumbnail" class="book-thumbnail" />
                <div class="book-info">
                    <h3 class="book-title">{{ data.title }}</h3>
                    <p class="book-contents">{{ data.contents }}</p>
                    <p class="book-publisher">출판사: {{ data.publisher }}</p>
                    <p class="book-price">가격: {{ data.price }}원</p>
                    <p class="book-datetime">출판일: {{ new Date(data.datetime).toLocaleDateString() }}</p>
                </div>
            </div>
        </div>
        <div class="no-data" v-else>
            <p>검색된 책이 없습니다.</p>
        </div>
    </content-section>
</template>

<script setup>
const { books } = storeToRefs(useBooksStore())
import { storeToRefs } from 'pinia'
import useBooksStore from "../stores/books"
import SearchBar from './SearchBar.vue'
import ContentSection from './ContentSection.vue'
import { onUnmounted } from 'vue'
import { ref } from 'vue'

defineProps({
    dataInfo: {
        type: Array,
        default: (() => [])
    }
})

onMounted(() => {
    // console.log(dataInfo)
})
</script>

<style></style>