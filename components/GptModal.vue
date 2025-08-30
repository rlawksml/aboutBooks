<template>
    <q-dialog v-model="visible">
        <q-card class="shared-modal-card">
            <q-card-section class="row items-center">
                <div>
                    <div class="dialog-title">{{ gptBookInfo?.title || title || '제목 없음' }}</div>
                    <div class="dialog-subtitle">{{ headerLabel }}</div>
                </div>

                <q-space />
                <q-btn dense flat round icon="close" aria-label="닫기" @click="close" />
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div v-if="imgToShow" class="modal-img-wrap mb-4">
                    <img :src="imgToShow" alt="modal image" class="modal-img" />
                </div>

                <!-- Summary -->
                <div class="modal-desc">
                    <h4 class="text-lg font-bold">요약</h4>
                    <p v-if="gptBookInfo?.summary && gptBookInfo.summary.length">{{ gptBookInfo.summary }}</p>
                    <p v-else class="empty">요약 정보가 없습니다.</p>
                </div>

                <!-- Details -->
                <div class="modal-desc mt-4">
                    <h4 class="text-lg font-bold">상세 정보</h4>
                    <div v-if="gptBookInfo?.details">
                        <p><strong>저자:</strong> {{ gptBookInfo.details.author || '정보 없음' }}</p>
                        <p><strong>장르:</strong> {{ gptBookInfo.details.genre || '정보 없음' }}</p>
                        <p><strong>출판년도:</strong> {{ gptBookInfo.details.published || '정보 없음' }}</p>
                    </div>
                    <p v-else class="empty">상세 정보가 없습니다.</p>
                </div>

                <!-- Recommendation -->
                <div class="modal-desc mt-4">
                    <h4 class="text-lg font-bold">추천의 한 마디</h4>
                    <p v-if="gptBookInfo?.recommand && gptBookInfo.recommand.length">{{ gptBookInfo.recommand }}</p>
                    <p v-else class="empty">추천 문구가 없습니다.</p>
                </div>

                <!-- Other books -->
                <div class="modal-desc mt-4">
                    <h4 class="text-lg font-bold">함께 보면 좋은 책</h4>
                    <ul v-if="gptBookInfo?.otherBooks?.length">
                        <li v-for="book in gptBookInfo.otherBooks" :key="book.title">
                            <strong>{{ book.title }}</strong> - {{ book.author || '저자 정보 없음' }}
                        </li>
                    </ul>
                    <p v-else class="empty">관련 도서 정보가 없습니다.</p>
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="닫기" color="primary" @click="close" />
                <q-btn flat :label="relatedButtonLabel" color="secondary" @click="openRelated" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useBooksStore from '~/stores/books'
const router = useRouter()
let searchKey = ref('')

const { searchResult, isLoading, error, search } = useGptSearch();
const booksStore = useBooksStore()
const { gptBookInfo } = storeToRefs(booksStore); // Pinia 스토어에서 gptBookInfo 가져오기

const props = defineProps({
    modelValue: { type: Boolean, required: true },
    title: { type: String, default: '' },
    desc: { type: String, default: '' },
    img: { type: String, default: '' },
    relatedHref: { type: String, default: '' },
    kind: { type: String, default: '' }
})

// header label: AI 추천인지 요약인지 표시
const headerLabel = computed(() => {
    if (props.kind === 'ai') return 'AI 추천 도서'
    if (props.kind === 'preview') return '요약 정보'
    // fallback: 내용 기반 판별
    if (gptBookInfo.value?.recommand) return 'AI 추천 도서'
    if (gptBookInfo.value?.summary) return '요약 정보'
    return '정보'
})

const onRelatedInfo = () => {
    router.push({ path: '/search', query: { q: searchKey.value } })
}

const emit = defineEmits(['update:modelValue', 'related'])

// 💡 버튼 라벨을 계산하는 computed 속성 추가
const relatedButtonLabel = computed(() => {
    return props.kind !== 'ai' ? '🔍 구매하기' : '🔗 도서 관련 정보';
});

const visible = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v)
})

function close() {
    visible.value = false
}

function openRelated() {
    if (props.relatedHref) {
        window.open(props.relatedHref, '_blank')
    }
    emit('related')
}

// 이미지 우선순위: prop img > gptBookInfo.image > null
const imgToShow = computed(() => {
    return props.img || ''
})

</script>

<style scoped>
/* Modern, clean white dialog */
.shared-modal-card {
    background: #ffffff;
    color: #0f172a;
    border-radius: 12px;
    box-shadow: 0 12px 36px rgba(15, 23, 42, 0.12);
    max-width: 780px;
    width: min(92vw, 780px);
    overflow: scroll;
    display: flex;
    flex-direction: column;
}

/* HEADER: subtle tinted background so user immediately sees context (요약 / AI 추천) */
.shared-modal-card>.q-card-section:first-of-type {
    background: linear-gradient(90deg, rgba(249, 250, 252, 1), rgba(245, 247, 250, 1));
    border-bottom: 1px solid rgba(15, 23, 42, 0.04);
    padding: 14px 16px;
}

/* Header */
.dialog-title {
    font-weight: 700;
    font-size: 1.05rem;
    color: #0b1220;
    margin-bottom: 2px;
}

.dialog-subtitle {
    font-size: 0.85rem;
    color: #6b7280;
}

/* Separator subtle */
.q-separator {
    background: rgba(15, 23, 42, 0.06);
}

/* Image area */
.modal-img-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
}

.modal-img {
    max-width: 100%;
    max-height: 260px;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 8px 22px rgba(15, 23, 42, 0.06);
}

/* CONTENT: readable block for GPT analysis */
.modal-desc {
    background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
    padding: 16px;
    margin: 12px 0;
    color: #0b1220;
    font-size: 15px;
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-word;
    max-height: 56vh;
    overflow-y: auto;
    border-radius: 8px;
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.04);
    border-left: 6px solid rgba(99, 102, 241, 0.12);
}


/* subtle hover lift so long text blocks feel tactile */
.modal-desc:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
}

/* Heading with emoji — use nth-of-type to give different icons per block order */
.modal-desc h4 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #111827;
    font-size: 1rem;
    margin: 0 0 8px 0;
    font-weight: 700;
}

/* icons for each modal-desc block (summary, details, tip, related books) */
.modal-desc:nth-of-type(1) h4::before {
    content: "📝";
    font-size: 1.05rem;
}

.modal-desc:nth-of-type(2) h4::before {
    content: "ℹ️";
    font-size: 1.05rem;
}

.modal-desc:nth-of-type(3) h4::before {
    content: "💡";
    font-size: 1.05rem;
}

.modal-desc:nth-of-type(4) h4::before {
    content: "📚";
    font-size: 1.05rem;
}

/* lead paragraph styling for better scannability */
.modal-desc p {
    margin: 0;
    color: #374151;
    font-size: 15px;
    line-height: 1.7;
}

/* emphasize first line slightly */
.modal-desc p::first-line {
    font-weight: 600;
    color: #0f172a;
}

/* lists */
.modal-desc ul {
    padding-left: 1.1rem;
    margin: 8px 0;
}

.modal-desc li {
    margin-bottom: 8px;
    color: #374151;
}


/* small visual tweaks for paragraphs, lists, empty states */
.modal-desc p {
    margin: 0;
    color: #374151;
}

.modal-desc ul {
    padding-left: 1.1rem;
    margin: 8px 0;
}

.modal-desc li {
    margin-bottom: 8px;
    color: #374151;
}


/* FOOTER: distinct band so action area stands out from content */
.shared-modal-card>.q-card-actions {
    background: linear-gradient(180deg, rgba(250, 250, 252, 0.9), rgba(255, 255, 255, 0.95));
    border-top: 1px solid rgba(15, 23, 42, 0.04);
    padding: 12px 16px;
    gap: 10px;
}

.empty {
    color: #9ca3af;
    font-style: italic;
    display: flex;
    gap: 8px;
    align-items: center;
}

.empty::before {
    content: "⚠️";
    opacity: 0.9;
}


/* empty placeholder with subtle icon */
.empty {
    color: #9ca3af;
    font-style: italic;
    display: flex;
    align-items: center;
    gap: 8px;
}

.empty::before {
    content: "⚠️";
    opacity: 0.9;
}

/* Card section spacing */
.q-card-section {
    padding: 18px 20px;
}

/* Action area */
.q-card-actions {
    padding: 14px 18px;
    gap: 10px;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.9), transparent);
}

/* Flat buttons: subtle, use inherited color */
.q-btn.flat {
    color: #374151;
}

.q-btn.flat:hover {
    background: rgba(15, 23, 42, 0.03);
}

/* Dialog overlay: soft dim + blur */
::v-deep .q-dialog__inner {
    background: rgba(10, 12, 20, 0.36);
    backdrop-filter: blur(6px);
}

/* Responsive */
@media (max-width: 600px) {
    .shared-modal-card {
        width: 96vw;
        border-radius: 10px;
    }

    .modal-img {
        max-height: 200px;
    }

    .modal-desc {
        font-size: 14px;
        padding: 12px;
        max-height: 56vh;
    }

    .q-card-section {
        padding: 12px 14px;
    }

    .q-card-actions {
        padding: 10px 14px;
    }
}
</style>