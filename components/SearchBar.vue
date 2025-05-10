<template>
    <Form @submit="searchClick" v-slot="{ errors }">
        <div class="flex justify-center my-2 mb-5 ml-auto">
            <Field @keydown.enter="searchClick" name="search" rules="required" v-model="searchData" class="" type="text"
                placeholder="검색어를 입력하세요" />
            <ErrorMessage name="search" v-slot="{ message }">
                <span class="error-message">{{ message }}</span>
            </ErrorMessage>
            <button type="submit" class="">검색</button>
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

const searchClick = async (e) => {
    e.preventDefault()

    console.log(searchData.value)
    console.log(searchData.value.trim())

    if (searchData.value.trim() === '') {
        notifyUser('🔴 검색어를 입력해주세요')
        return
    }

    await booksStore.searchBook(searchData.value)
    await youtubeStore.fetchYoutube(searchData.value)
    moveSearchPage()
}

const moveSearchPage = () => {
    router.push('/search')
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