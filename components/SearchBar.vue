<template>
    <div class="flex items-center justify-center">
        <ClientOnly>
            <q-btn v-if="searchType" flat round color="primary" icon="help" @click="tooltip = !tooltip" class="mr-2">
                <q-tooltip v-model="tooltip" anchor="top middle" self="top middle" :offset="[0, 30]"
                    transition-show="jump-down" transition-hide="jump-up">
                    통합 검색 안내: 도서, 블로그, 유튜브를 한 번에 검색할 수 있습니다.
                </q-tooltip>
            </q-btn>
        </ClientOnly>
        <Form class="" v-slot="{ validate }">
            <div class="p-1 border-gray-100 rounded-lg shadow-md flex justify-center my-2 ml-auto">
                <Field name="search" rules="required" v-model="searchData"
                    class="border mr-2 rounded-lg p-2 border-none outline-none focus:ring-2 focus:ring-blue-500"
                    type="text" placeholder="검색어를 입력하세요" />
                <button @click="(e) => handleSubmit(e, validate)" type="submit" class="mx-2 hover:font-bold">검색</button>

            </div>
        </Form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import useYoutubeSearch from '~/stores/youtubeSearch'
import useBooksStore from "../stores/books"
import useBlogSearch from '~/stores/blogSearch'
import { useRouter } from 'vue-router'
import { Form, Field, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';

import { useQuasar } from 'quasar'

const tooltip = ref(false)
const $q = useQuasar();

// ✅ 필수 유효성 검사 규칙 등록
defineRule('required', required);
defineProps({
    searchType: {
        type: Boolean,
        default: true,
    }
})

let searchData = ref('')
const router = useRouter()
const booksStore = useBooksStore()
const youtubeStore = useYoutubeSearch()
const blogStore = useBlogSearch()

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
    await Promise.all([
        booksStore.searchBook(searchData.value),
        youtubeStore.fetchYoutube(searchData.value),
        blogStore.fetchBlog(searchData.value)
    ]);
    $q.loading.hide()
    await moveSearchPage()
}

const moveSearchPage = async () => {
    if (router.currentRoute.value.path !== '/search') {
        router.push('/search')
    }
}

function notifyUser(message) {
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