import { defineStore } from 'pinia';

const useBooksStore = defineStore('booksStore', {
  state() {
    return {
      books: [],
    };
  },
  actions: {

    async searchBook(keyword) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch(
          'https://dapi.kakao.com/v3/search/book?target=title?target=authors',
          {
            params: {
              query: keyword,
              page: 40,
              size: 25,
              target: 'title',
            },
            headers: {
              Authorization: `KakaoAK ${config.public.kakaoAPI}`,
            },
          },
        );
        this.books = response.documents;
      } catch (error) {
        console.warn(error);
      }
    },
  },
  getters: {
    getBooks: (state) => state.books,
  },
});

export default useBooksStore;
