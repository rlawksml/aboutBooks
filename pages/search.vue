<template>
    <div>
        <content-section>
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
</style>
