
<template>
    <div>
        <content-section>
            <search-bar></search-bar>
            <intro-books></intro-books>
        </content-section>
<p></p>


    </div>
</template>

<script setup lang="ts">
import ContentSection from '~/components/ContentSection.vue';
import IntroBooks from '~/components/main/IntroBooks.vue';
import useYoutbueSearch from '~/stores/youtubeSearch';
import SearchBar from '../components/SearchBar.vue';
import useBooksStore from '../stores/books';

const booksStore = useBooksStore();
const youtubeSearch = useYoutbueSearch();

onMounted(async() => {
    // await booksStore.fetchBooks();
    // console.log('📚 도서 목록:', booksStore.getBooks);
});

</script>

<style lang="scss" scoped>

    

</style>