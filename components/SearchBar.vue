<template>
    <div class="flex justify-center my-2 mb-5 ml-auto">
        <input @keypress="KeyEnter" v-model="searchData" class="" type="text" placeholder="검색어를 입력하세요">
        <button @click="searchClick" class="">검색</button>
    </div>
</template>

<script setup >
    import {ref} from 'vue'
    import useYoutbueSearch from '~/stores/youtubeSearch'
    import useBooksStore from "../stores/books"
    import { useRouter } from 'vue-router'

    let searchData = ref('')
    const router = useRouter()

    const booksStore = useBooksStore()
    const youtubeStore = useYoutbueSearch()
    
    const KeyEnter = (e) => {
        if (e.key === 'Enter') {
            booksStore.searchBook(searchData.value)
            youtubeStore.fetchYoutube(searchData.value)    
            moveSearchPage()
        }
    }
    
    const searchClick = () => {        
        booksStore.searchBook(searchData.value)
        youtubeStore.fetchYoutube(searchData.value)
        moveSearchPage()
    }

    const moveSearchPage = () => {
        router.push('/search')
    }
    
</script>

<style lang="scss" scoped>

</style>