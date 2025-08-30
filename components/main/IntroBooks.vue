<template>
    <div class="flex flex-col items-center justify-center">
        <div class="mr-10 shrink-1 min-w-1/2">
            <figure class="w-full max-w-[300px] min-w-[250px] mb-5 book-figure">
                <img :src="selectBook.bookImg" alt="책 이미지">
            </figure>
        </div>

        <div class="flex flex-col items-start justify-start px-10 w-[80%] max-w-[800px] break-keep">
            <p class="mb-2 text-xl font-bold title">{{ selectBook.title }}</p>
            <p class="mb-5 desc">{{ reduceLetter(selectBook.desc) }}</p>
        </div>

        <ClientOnly>
            <div class="flex w-[100%] my-5">
                <q-btn class="mr-auto" label="책 보러 가기" color="primary" @click="moveExternal(selectBook.link)"
                    :disable="isLoading" />
                <div class="flex gap-3">
                    <q-btn label="Preview" color="teal" dense flat @click="openSharedModal('preview')"
                        :loading="isLoading" :disable="isLoading" />
                    <q-btn label="AI 추천 도서" color="orange" dense flat @click="openSharedModal('ai')"
                        :loading="isLoading" :disable="isLoading" />
                    <q-btn label="관련 자료" color="purple" dense flat @click="moveSearchPage" :disable="isLoading" />
                </div>
            </div>
        </ClientOnly>

        <GptModal v-model="modalVisible" :title="modalContent.title" :desc="modalContent.desc" :img="modalContent.img"
            :related-href="modalContent.relatedHref" :kind="modalContent.kind" />
    </div>
</template>

<script setup lang="ts">
import bookImage1 from '~/assets/images/book1.jpg'
import bookImage2 from '~/assets/images/book2.jpg'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import useGptSearch from '~/composables/useGptSearch'; // 이렇게 임포트합니다.
import GptModal from '../GptModal.vue';

const { searchResult, isLoading, error, search } = useGptSearch();

const $q = useQuasar();
const router = useRouter()
let searchKey = ref('')

const modalVisible = ref(false)
const modalContent = ref({
    title: '',
    desc: '',
    img: '',
    relatedHref: '',
    kind: '',
    searchResult: {}
})

const openSharedModal = async (kind: 'preview' | 'ai') => {
    $q.loading.show({
        message: 'GPT가 정보를 분석 중입니다...',
        spinnerColor: 'white'
    });
    try {
        if (kind === 'preview') {
            await search(searchKey.value, 'summary')
            modalContent.value = {
                title: selectBook.value.title,
                desc: selectBook.value.desc || '',
                img: selectBook.value.bookImg || '',
                relatedHref: selectBook.value.link || '',
                kind: 'preview',
                searchResult: searchResult.value
            }
        } else if (kind === 'ai') {
            await search(searchKey.value, 'recommend')
            // 샘플: AI 내용 생성(실제 AI 호출 시 결과로 교체)
            modalContent.value = {
                title: `AI 추천 — ${selectBook.value.title}`,
                desc: `<p>AI가 분석한 추천 설명(샘플). ${selectBook.value.title} 관련 도서/자료를 확인해보세요.</p>`,
                img: selectBook.value.bookImg || '',
                relatedHref: `https://www.google.com/search?q=${encodeURIComponent(selectBook.value.title)}`,
                kind: 'ai',
                searchResult: searchResult.value
            }
        }
    } catch (e) {
        console.error(e)
    } finally {
        $q.loading.hide();
    }
    modalVisible.value = true
}

function notifyUser() {
    $q.notify({
        message: '✅ About Books',
        color: 'green',
        position: 'top',
    });
}

const initBookList = [
    {
        title: "마흔에 읽는 쇼펜하우어",
        desc: "마흔의 마음은 복잡하다. 그동안 수많은 시험을 치르고 자리 잡기 시작했지만, 한참 남은 인생이 기대되기보다 늘 그렇듯 같은 일상이 반복될 것이라는 생각을 하게 된다. 벌써부터 웬만한 일은 재미가 없고 뻔하게 느껴진다. 언제부터인가 “산다는 것은 괴로운 것이다”라는 말에 고개를 끄덕이게 됐다. 행복, 고통, 인생에 대해 고민하기 시작한 당신에게 쇼펜하우어의 조언이 필요할 때다.",
        link: "https://product.kyobobook.co.kr/detail/S000208779631",
        bookImg: bookImage1
    },
    {
        title: "초역 부처의 말",
        desc: "2500년 동안 사람들에게 사랑받으며 회자되어 온 부처의 말을 코이케 류노스케 스님이 현대어로 재해석해 책으로 출간했다. 간결하게 축약된 핵심만을 담은 부처의 메시지는, 마음이 약해지고 어려움에 처한 사람들에게 힘과 용기를 불어넣어 준다. 부처의 말이 간결하듯 이 책의 기획 의도 역시 매우 단순하다. 저자는 서문에 독자들이 이 책을 손에 들고 어디를 펼치더라도 그곳에 적힌 부처의 말이 스르륵 마음을 물들이고, 어느 순간 그 속에서 기분 좋은 바람이 일어나 더 좋은 방향으로 이끌어 주길 바란다고 썼다.",
        link: "https://product.kyobobook.co.kr/detail/S000213310247",
        bookImg: bookImage2
    }
]

const moveSearchPage = () => {
    router.push({ path: '/search', query: { q: searchKey.value } })
}

const reduceLetter = (text: string): string => {
    return text.length >= 200 ? text.slice(0, 200).concat('...') : text
}

const selectBook = useState('selectBook', () => {
    const randomNum = Math.floor(Math.random() * initBookList.length)
    searchKey.value = initBookList[randomNum].title
    return initBookList[randomNum]
})

onMounted(() => {
    selectBook.value = selectBook.value // 여기서 콜백이 실행됨
    searchKey.value = selectBook.value.title
})

const moveExternal = (link: string) => {
    window.open(link)
}

watch(searchResult, (newResult) => {
    if (newResult) {
        modalVisible.value = true;
    }
});
</script>

<style scoped>
/* 이미지 고정 크기 + 바깥 회색 배경 패널 */
.book-figure {
    width: 300px;
    height: 420px;
    /* 원하는 고정 크기(비율에 맞게 조정) */
    min-width: 250px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f4f6;
    /* 연회색 배경 */
    border-radius: 12px;
    padding: 14px;
    box-sizing: border-box;
    box-shadow: 0 8px 18px rgba(2, 6, 23, 0.06);
    overflow: hidden;
}

/* 이미지 내부에 맞춰 유지: 비율 유지하며 가운데 정렬 */
.book-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 6px;
    display: block;
    transition: transform .18s ease, box-shadow .18s ease;
}

/* hover 시 약간 확대 효과 */
.book-figure:hover .book-img {
    transform: scale(1.03);
    box-shadow: 0 14px 30px rgba(2, 6, 23, 0.08);
}

/* 반응형: 화면이 작아지면 패널 크기 줄이기 */
@media (max-width: 640px) {
    .book-figure {
        width: 180px;
        height: 260px;
        padding: 10px;
    }
}
</style>