<template>
    <div class="flex justify-center my-10">
        <input v-model="searchData" class="" type="text" placeholder="검색어를 입력하세요">
        <button @click="searchClick" class="">검색</button>
    </div>
</template>

<script setup >
    import {ref} from 'vue'
    import useBooksStore from "../stores/books"

    let searchData = ref('')

    const booksStore = useBooksStore()
    
    const searchClick = () => {        
        booksStore.searchBook(searchData.value)
    }
    
</script>

<style lang="scss" scoped>

</style>