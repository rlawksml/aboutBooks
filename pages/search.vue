<template>
    <div>
        <content-section>
            <div v-if="books.length">
                <div v-for="book in books" :key="book.isbn" class="book-item">
                    <img :src="book.thumbnail" alt="Book Thumbnail" />
                    <h3>{{ book.title }}</h3>
                    <p>{{ book.contents }}</p>
                    <p>출판사: {{ book.publisher }}</p>
                    <p>가격: {{ book.price }}원</p>
                    <p>출판일: {{ new Date(book.datetime).toLocaleDateString() }}</p>
                </div>
            </div>
            <div v-else>
                <p>검색된 책이 없습니다.</p>
            </div>
        </content-section>
    </div>
</template>

<script setup lang="ts">
import ContentSection from '~/components/ContentSection.vue';
import useBooksStore from '~/stores/books';
import { storeToRefs } from 'pinia'

const {books } = storeToRefs(useBooksStore())

</script>

<style lang="scss" scoped>

</style>