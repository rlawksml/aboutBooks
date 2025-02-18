
<template>
    <div>
        <content-section>
            <intro-books></intro-books>
            <search-bar></search-bar>
        </content-section>

<p>         {{  }} ds</p>


    </div>
</template>

<script setup lang="ts">
import ContentSection from '~/components/ContentSection.vue';
import IntroBooks from '~/components/main/IntroBooks.vue';
import SearchBar from '~/components/SearchBar.vue';
import useBooksStore from '../stores/books';

const booksStore = useBooksStore();

onMounted(async() => {
    await booksStore.fetchBooks();
    console.log('📚 도서 목록:', booksStore.getBooks);
});

</script>

<style lang="scss" scoped>

    

</style>