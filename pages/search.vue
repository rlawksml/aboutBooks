<template>
    <div>
        <q-tabs v-model="tab" class="text-primary" dense active-color="primary" indicator-color="primary">
            <q-tab name="books" label="도서" />
            <q-tab name="youtube" label="유튜브" />
            <q-tab name="blog" label="블로그" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="books">
                <search-template :dataInfo="dataInfo" class="search-bar-container" />
            </q-tab-panel>
            <q-tab-panel name="youtube">
                <search-template :dataInfo="dataInfo" class="search-bar-container" />
            </q-tab-panel>
            <q-tab-panel name="blog">
                <div>서비스 예정</div>
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>

<script setup lang="ts">
import ContentSection from '~/components/ContentSection.vue';
import useBooksStore from '~/stores/books';
import { storeToRefs } from 'pinia'
import lodash from 'lodash'

onMounted(() => {
    const booksStore = useBooksStore()
    dataInfo = (lodash.cloneDeep(booksStore.books))
})

onUnmounted(() => {
    const booksStore = useBooksStore()
    booksStore.searchBook('')
    console.log('🧹 cleanup')
})

let dataInfo = ref([])
const tab = ref('books')

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
