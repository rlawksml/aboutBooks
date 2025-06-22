<template>
    <div class="max-w-3xl mx-auto py-10 px-4">
        <div class="bg-white shadow rounded-2xl p-6 mb-8">
            <h1 class="text-2xl font-semibold mb-2">마이 페이지</h1>
            <p class="text-gray-600">개인 정보와 활동 내역을 확인할 수 있어요.</p>
        </div>

        <div class="bg-white shadow rounded-2xl p-6 mb-8">
            <h2 class="text-xl font-medium mb-4">👤 사용자 정보</h2>
            <div class="space-y-2 text-gray-700">
                <p><span class="font-semibold">현재 로그인 상태:</span> {{ isLoggedIn ? '로그인됨' : '로그아웃됨' }}</p>
                <p><span class="font-semibold">닉네임:</span> {{ name }} 님</p>
            </div>

            <div class="mt-4 flex gap-3">
                <button v-if="isLoggedIn" @click="loginStore.logout"
                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    로그아웃
                </button>
                <button @click="openProfileModal" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    프로필 수정
                </button>
            </div>
        </div>

        <div class="bg-white shadow rounded-2xl p-6">
            <h2 class="text-xl font-medium mb-4">🔍 내가 검색한 기록</h2>
            <p class="text-gray-600">내가 검색한 기록이 여기에 표시되기</p>
            <p class="text-gray-400 text-sm mt-2">※ 추후 기능이 구현될 예정입니다.</p>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useLoginStore from '~/stores/login'

const loginStore = useLoginStore()
const router = useRouter()
const { isLoggedIn, name } = storeToRefs(loginStore)

watch(
    () => isLoggedIn.value,
    (newValue) => {
        if (!newValue) router.push('/')
    }
)

onMounted(() => {
    if (!isLoggedIn.value) {
        loginStore.getLocalStorageUser()
    }
})
</script>

<style scoped>
/* Tailwind 기반으로 구성되어 별도 스타일은 생략 */
</style>
