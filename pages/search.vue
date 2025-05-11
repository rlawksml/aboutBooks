<template>
    <div>
        <content-section class="!flex-nowrap">

            <div class="flex flex-col justify-center my-2 mb-5 ml-auto">
                <search-bar class="flex" />
                <div class="flex justify-center my-2 mb-5 ml-auto">
                    <h2 class="text-sm font-light px-4 py-2">검색 결과</h2>
                    <p class="text-gray-600 px-4 py-2">검색된 책 : {{ books.length || 0 }} 권</p>
                    <!-- <button @click="$router.push('/')" class="bg-blue-500 text-blue px-4 py-2 rounded">홈으로</button> -->
                </div>
            </div>


            <!-- <p class="text-gray-600 mb-4">검색어: {{ searchData }}</p> -->
            <!-- <p class="text-gray-600 mb-4">검색된 유튜브 영상의 개수: {{ youtubeVideos.length }}</p> -->

            <div v-if="books.length" class="books-grid">
                <div v-for="book in books" :key="book.isbn" class="book-card">
                    <img :src="book.thumbnail" alt="Book Thumbnail" class="book-thumbnail" />
                    <div class="book-info">
                        <h3 class="book-title">{{ book.title }}</h3>
                        <p class="book-contents">{{ book.contents }}</p>
                        <p class="book-publisher">출판사: {{ book.publisher }}</p>
                        <p class="book-price">가격: {{ book.price }}원</p>
                        <p class="book-datetime">출판일: {{ new Date(book.datetime).toLocaleDateString() }}</p>
                    </div>
                </div>
            </div>
            <div class="no-data" v-else>
                <p>검색된 책이 없습니다.</p>
            </div>
        </content-section>
    </div>
</template>

<script setup lang="ts">
import ContentSection from '~/components/ContentSection.vue';
import useBooksStore from '~/stores/books';
import { storeToRefs } from 'pinia'

const { books } = storeToRefs(useBooksStore())

</script>

<style lang="scss" scoped>
.books-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    padding: 16px;
}

.book-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
}

.book-thumbnail {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.book-info {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.book-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
}

.book-contents {
    font-size: 0.9rem;
    color: #555;
    margin: 0;
}

.book-publisher,
.book-price,
.book-datetime {
    font-size: 0.8rem;
    color: #777;
    margin: 0;
}

.no-data {
    text-align: center;
    font-size: 1rem;
    color: #555;
    margin: auto 0
}

.search-bar-container {
    margin-bottom: 20px;
}
</style>
