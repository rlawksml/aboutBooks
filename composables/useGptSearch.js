// composables/useGptSearch.js
import { ref } from 'vue';
const useBooksStore = (await import('~/stores/books')).default;

const useGptSearch = () => {
    const searchResult = ref('');
    const isLoading = ref(false);
    const error = ref(null);

    const search = async (query, type = 'default') => {
        const booksStore = useBooksStore();
        if (!query) return;

        isLoading.value = true;
        error.value = null;

        // type에 따라 GPT에게 보낼 오더(프롬프트)를 다르게 설정
        let gptOrder = '';
        switch (type) {
            case 'recommend':
                gptOrder = `이 도서와 비슷한 도서를 교보문고 바탕으로 추천해줘: ${query}`;
                break;
            case 'summary':
                gptOrder = `이 도서에 대해 200자 내외로 요약하고 감상평 얘기해줘: ${query}`;
                break;
            default:
                gptOrder = `다음 내용에 대해 설명해줘: ${query}`;
                break;
        }

        try {
            const response = await $fetch('/api/search', {
                // 쿼리 파라미터로 gpt에게 전달할 오더를 보냅니다.
                query: { q: gptOrder },
            });

            if (response.error) {
                error.value = response.error;
            } else {
                searchResult.value = response.result;
                booksStore.gptBookInfo = JSON.parse(response.result); // 스토어에 결과 저장
            }
        } catch (e) {
            console.error(e);
            error.value = '검색 중 오류가 발생했습니다.';
        } finally {
            isLoading.value = false;
        }
    };

    return { searchResult, isLoading, error, search };
};

export default useGptSearch;