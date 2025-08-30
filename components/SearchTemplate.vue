<template>
  <content-section class="!flex-nowrap">

    <div class="flex flex-col justify-center my-2 mb-5 ml-auto">


    </div>

    <div v-if="dataInfo.length" class="books-grid">
      <div v-for="data in dataInfo" :key="data.isbn" class="book-card">
        <img :src="data.thumbnail" alt="Book Thumbnail" class="book-thumbnail" />
        <div class="book-info">

          <!-- title -->
          <h3 v-if="props.type === 'blog'" class="book-title" v-html="data.title"></h3>
          <h3 v-else class="book-title">{{ data.title }}</h3>

          <p class="book-contents">{{ data.contents }}</p>

          <p v-if="data.authors" v-for="(author, index) in data.authors" :key="index" class="book-publisher">{{ author
            }}</p>

          <p v-if="data.blogname" class="book-publisher">{{ data.blogname }}</p>

          <p v-if="data.price" class="book-price">가격: {{ data.price }}원</p>

          <p class="book-datetime">{{ new Date(data.datetime).toLocaleDateString() }}</p>

          <a :href="data.url" target="_blank" class="text-blue-500 hover:underline">자세히 보기</a>

        </div>
      </div>
    </div>
    <div class="no-data" v-else>
      <p>검색 결과가 없습니다.</p>
    </div>
  </content-section>
</template>

<script setup>

import { storeToRefs } from 'pinia'
import useBooksStore from "../stores/books"
import ContentSection from './ContentSection.vue'
import useYoutubeSearch from '~/stores/youtubeSearch'
import useBlogSearch from '~/stores/blogSearch'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const booksStore = useBooksStore()
const youtubeStore = useYoutubeSearch()
const blogStore = useBlogSearch()
const route = useRoute()
const $q = useQuasar();


const props = defineProps({
  dataInfo: {
    type: Array,
    default: (() => [])
  },
  type: {
    type: String,
    default: 'books'
  }
})

const searchHandler = async (key) => {
  if (!key) return;
  $q.loading.show({
    message: '검색중입니다...',
    spinnerColor: 'white',
    spinnerSize: 50,
  })
  await Promise.all([
    booksStore.searchBook(key),
    youtubeStore.fetchYoutube(key),
    blogStore.fetchBlog(key)
  ]);
  $q.loading.hide()
}

onMounted(() => {
  const key = route.query.q;
  if (key) {
    searchHandler(key);
  }
})

watch(() => route.query.q, (newQ) => {
  if (newQ) {
    searchHandler(newQ);
  }
})

watch(() => props.dataInfo, (newData) => {
}, { immediate: true })

</script>


<style scoped>
.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 한 줄 3개 고정 */
  gap: 1.5rem;
  padding: 1rem;
}

.book-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 420px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
  overflow: hidden;
}

.book-card:hover {
  transform: translateY(-4px);
}

.book-thumbnail {
  width: 100%;
  height: 220px;
  object-fit: cover;
  background-color: #f1f1f1;
}

.book-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
}

.book-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.4;
  color: #111827;
  min-height: 3rem;
}

.book-contents {
  font-size: 0.95rem;
  color: #374151;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 4.2rem;
}

.book-publisher,
.book-price,
.book-datetime {
  font-size: 0.85rem;
  color: #6b7280;
}

@media (max-width: 1024px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .books-grid {
    grid-template-columns: 1fr;
  }
}
</style>
