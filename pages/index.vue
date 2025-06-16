
<template>
    <div>
        <content-section>
            <search-bar></search-bar>
            <intro-books></intro-books>
        </content-section>
        
        <Library/>
    </div>

</template>

<script setup lang="ts">
import ContentSection from '~/components/ContentSection.vue';
import IntroBooks from '~/components/main/IntroBooks.vue';
import useYoutubeSearch from '~/stores/youtubeSearch';
import SearchBar from '../components/SearchBar.vue';
import useBooksStore from '../stores/books';
import Library from '../components/map/library.vue';

const booksStore = useBooksStore();
const youtubeSearch = useYoutubeSearch();

</script>

<style lang="scss" scoped>

    

</style>