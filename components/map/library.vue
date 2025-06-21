<template>
  <div class="wrapper p-4 max-w-6xl mx-auto">
    <!-- 🔍 검색 + 지역 선택 -->
     <q-btn flat round color="primary" icon="help" @click="tooltip = !tooltip" class="mr-2">
            <q-tooltip v-model="tooltip" anchor="top middle" self="top middle" :offset="[0, 30]"
                transition-show="jump-down" transition-hide="jump-up">
                서울시내 도서관을 검색할 수 있습니다. 지역을 선택하거나 도서관 이름으로 검색해보세요.
            </q-tooltip>
        </q-btn>
    <div class="searchBox flex flex-col sm:flex-row gap-4 mb-6">
      
      <q-select
        v-model="selectedRegion"
        :options="regions"
        label="지역 선택"
        placeholder="전체 지역"
        class="pSelect border rounded"
        emit-value
        map-options
        @update:model-value="currentPage = 1"
        />

        <q-input
        v-model="searchQuery"
        type="search"
        label="도서관 검색"
        placeholder="도서관 이름을 검색해보세요"
        class="w-full sm:w-1/2"
        icon="search"
        @keyup.enter="searchBtn"
        dnense
      >
        <template v-slot:append>
          <q-icon v-if="searchQuery !== ''" name="close" @click="resetInput" class="cursor-pointer" />
          <q-icon name="search" @click="searchBtn" class="cursor-pointer" />
        </template>
      </q-input>
      <q-btn
        @click="resetSearch"
        :icon="'refresh'"
        :class="'bg-blue-600 px-2 py-2 rounded hover:bg-blue-700 transition'"
        class="last"
        >
    </q-btn>
    </div>

    <!-- 🧾 도서관 카드 목록 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
            v-if="filteredList.length === 0"
            class="col-span-full text-center text-gray-500 p-4">
            도서관 검색 결과가 없습니다. 다른 도서관을 찾아보세요
        </div>
      <div
        v-for="item in paginatedList"
        :key="item.lbrry_seq_no"
        class="p-4 bg-white rounded shadow hover:shadow-lg transition"
      >
        <h3 class="text-lg font-bold mb-1">{{ item.lbrry_name }}</h3>
        <p class="text-sm text-gray-600 mb-1">📍 {{ item.adres }}</p>
        <p class="text-sm text-gray-600 mb-1">☎ {{ item.tel_no || '제공 정보 없음' }}</p>
        <p class="text-sm text-gray-600 mb-1">🕒 {{ item.op_time || '제공 정보 없음' }}</p>
        <p class="text-sm text-gray-500 mb-1">❌ {{ item.fdrm_close_date || '제공 정보 없음' }}</p>
        <a
          :href="item.hmpg_url"
          target="_blank"
          class="text-blue-600 text-sm hover:underline mt-2 inline-block moveBtn"
        >
          홈페이지 바로가기
        </a>
      </div>
    </div>

    <!-- 📄 페이지네이션 -->
    <div class="flex justify-center items-center gap-4 mt-8">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        이전
      </button>
      <span class="text-sm text-gray-700">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 📦 도서관 데이터 (이 자리에 직접 JSON 넣거나, props/API로 불러올 수도 있어요)
const rawData = ref([])

// 🔍 검색 & 필터 상태
const searchQuery = ref('')
const selectedRegion = ref('')
const currentPage = ref(1)
const itemsPerPage = 9

// 지역 목록
const regions = computed(() => {
  const set = new Set(rawData.value.map(item => item.code_value))
  return Array.from(set)
})

// 필터링된 리스트
const filteredList = computed(() =>
  rawData.value.filter(item =>
    item.lbrry_name.includes(searchQuery.value) &&
    (selectedRegion.value === '' || item.code_value === selectedRegion.value)
  )
)

// 페이지네이션
const totalPages = computed(() =>
  Math.ceil(filteredList.value.length / itemsPerPage)
)

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredList.value.slice(start, start + itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

onMounted(async () => {
  try {
    const res = await fetch('/data/seoulCurrentLibrary.json') // public 폴더 기준 경로
    if (!res.ok) throw new Error('데이터를 불러오는데 실패했습니다')
    rawData.value = await res.json()
    rawData.value = rawData.value.DATA // 실제 데이터가 DATA 키 안에 있다고 가정
  } catch (e) {
    console.error(e)
  }
})

const resetSearch = () => {
  searchQuery.value = ''
  selectedRegion.value = ''
  currentPage.value = 1
}

const resetInput = () => {
  searchQuery.value = ''
}


const searchBtn = () => {
  rawData.value.filter(item =>
    item.lbrry_name.includes(searchQuery.value) &&
    (selectedRegion.value === '' || item.code_value === selectedRegion.value)
  )
}


</script>

<style scoped>
/* 추가적인 스타일이 필요하면 여기에 */

p {
    word-break: keep-all;
}
.moveBtn {
    transition: transform 0.2s;
    text-decoration: none;
    &:hover {
        transform: translateY(-2px);
        font-weight: bold;
        color: #1d4ed8; /* Tailwind blue-700 */
    }
}

.wrapper {
    background-color: #f9fafb; /* Tailwind gray-100 */
}

.searchBox {
    gap: 1rem;
    display: flex;
    .pSelect {
        padding: 0 0.5rem;
        border: 1px solid transparent;
        border-radius: 0.375rem; /* Tailwind rounded */
        width: 100%;
        flex-shrink: 1;
        max-width: 200px;
    }
    button{
        margin-left: auto;
    }
}
</style>
