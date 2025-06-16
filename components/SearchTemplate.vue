
<template>
    <content-section class="!flex-nowrap">

        <div class="flex flex-col justify-center my-2 mb-5 ml-auto">

            <!-- <div class="flex justify-center my-2 mb-5 ml-auto">
                <h2 class="text-sm font-light px-4 py-2">검색 결과</h2>
                <p class="text-gray-600 px-4 py-2">검색 건수 : {{ dataInfo.length || 0 }} 권</p>
                <button @click="$router.push('/')" class="bg-blue-500 text-blue px-4 py-2 rounded">홈으로</button>
            </div> -->
        </div>

        <div v-if="dataInfo.length" class="books-grid">
            <div v-for="data in dataInfo" :key="data.isbn" class="book-card">
                <img :src="data.thumbnail" alt="Book Thumbnail" class="book-thumbnail" />
                <div class="book-info">
                    
                    <!-- title -->
                    <h3 v-if="props.type === 'blog'" class="book-title" v-html="data.title"></h3>
                    <h3 v-else class="book-title">{{ data.title }}</h3>

                    <p class="book-contents">{{ data.contents }}</p>

                    <p v-if="data.authors" 
                    v-for="(author, index) in data.authors"
                    :key="index"
                    class="book-publisher">{{ author }}</p>

                    <p v-if="data.blogname" class="book-publisher">{{ data.blogname }}</p>

                    <p v-if="data.price" class="book-price">가격: {{ data.price }}원</p>
                
                    <p class="book-datetime">{{ new Date(data.datetime).toLocaleDateString() }}</p>

                    <a href="" :href="data.url" target="_blank" class="text-blue-500 hover:underline">자세히 보기</a>

                </div>
            </div>
        </div>
        <div class="no-data" v-else>
            <p>검색 결과가 없습니다.</p>
        </div>
    </content-section>
</template>

<script setup>
const { books } = storeToRefs(useBooksStore())
import { storeToRefs } from 'pinia'
import useBooksStore from "../stores/books"
import ContentSection from './ContentSection.vue'

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

onMounted(() => {
})

watch(() => props.dataInfo, (newData) => {
}, { immediate: true })

</script>


<style scoped>
.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄 3개 고정 */
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
