<template>
    <Form class="" v-slot="{ validate }">
        <div class="p-1 border-gray-100 rounded-lg shadow-md flex justify-center my-2 ml-auto">
            <Field name="search" rules="required" v-model="searchData"
                class="border mr-2 rounded-lg p-2 border-none outline-none focus:ring-2 focus:ring-blue-500" type="text"
                placeholder="검색어를 입력하세요" />
            <button @click="(e) => handleSubmit(e, validate)" type="submit" class="mx-2 hover:font-bold">검색</button>
        </div>
    </Form>
</template>

<script setup>
import { ref } from 'vue'
import useYoutubeSearch from '~/stores/youtubeSearch'
import useBooksStore from "../stores/books"
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';

import { useQuasar } from 'quasar'

const $q = useQuasar();

// ✅ 필수 유효성 검사 규칙 등록
defineRule('required', required);

let searchData = ref('')
const router = useRouter()
const booksStore = useBooksStore()
const youtubeStore = useYoutubeSearch()

const handleSubmit = async (e, validate) => {
    e.preventDefault()
    const isValid = await validate()

    if (!isValid || searchData.value.trim() === '') {
        notifyUser('🔴 검색어를 입력해주세요')
        return
    }

    searchClick(isValid)
}

const searchClick = async () => {
    $q.loading.show({
        message: '검색중입니다...',
        spinnerColor: 'white',
        spinnerSize: 50,
    })
    await booksStore.searchBook(searchData.value)
    await youtubeStore.fetchYoutube(searchData.value)
    $q.loading.hide()
    moveSearchPage()
}

const moveSearchPage = async () => {
    if (router.currentRoute.value.path !== '/search') {
        router.push('/search')
    }
}

function notifyUser(message) {
    console.log(message)
    $q.notify({
        message,
        color: 'red',
        position: 'top',
    });
}

</script>

<style lang="scss" scoped>
.error-Message {
    display: none;
}
</style>