<template>
    <div>
        <search-bar :searchType="false" class="flex" />
        
        <q-tabs v-model="tab" class="text-primary" dense active-color="primary" indicator-color="primary">
            <q-tab name="books" label="도서" />
            <q-tab name="youtube" label="유튜브" />
            <q-tab name="blog" label="블로그" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="books">
                <search-template :dataInfo="dataInfo" type="book" class="search-bar-container" />
            </q-tab-panel>
            <q-tab-panel name="youtube">
                <search-template :dataInfo="dataInfo2" type="youbue" class="search-bar-container" />
            </q-tab-panel>
            <q-tab-panel name="blog">
                <search-template :dataInfo="dataInfo3" type="blog" class="search-bar-container" />
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>

<script setup lang="ts">
import useBooksStore from '~/stores/books';
import useYoutubeSearch from '~/stores/youtubeSearch';
import useblogSearch from '~/stores/blogSearch';
import lodash from 'lodash'
import { useQuasar } from 'quasar'
import { onMounted, onUnmounted, ref, watch } from 'vue'

let dataInfo = ref<any[]>([])
let dataInfo2 = ref<any[]>([])
let dataInfo3 = ref<any[]>([])
const tab = ref('books')
const $q = useQuasar();

const booksStore = useBooksStore()
const youtubeStore = useYoutubeSearch()
const blogStore = useblogSearch()

onMounted(async () => {
    $q.loading.show({
        message: 'Loading...',
        spinnerColor: 'white',
        spinnerSize: 50,
    })
    
    dataInfo.value = lodash.cloneDeep(booksStore.books)
    dataInfo2.value = lodash.cloneDeep(youtubeStore.youtubes)
    dataInfo3.value = lodash.cloneDeep(blogStore.blogList)
    $q.loading.hide()
})

// store 데이터가 바뀔 때마다 dataInfo도 자동 갱신
watch(
  () => booksStore.books,
  (newVal) => {
    dataInfo.value = lodash.cloneDeep(newVal)
  }
)
watch(
  () => youtubeStore.youtubes,
  (newVal) => {
    dataInfo2.value = lodash.cloneDeep(newVal)
  }
)
watch(
  () => blogStore.blogList,
  (newVal) => {
    dataInfo3.value = lodash.cloneDeep(newVal)
  }
)

onUnmounted(() => {
    dataInfo.value = []
    dataInfo2.value = []
    dataInfo3.value = []
    booksStore.books = []
    youtubeStore.youtubes = []
    blogStore.blogList = []
    console.log('🧹 cleanup')
})

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
