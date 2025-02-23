import { defineStore } from 'pinia';
import { ofetch } from 'ofetch';

const useBooksStore = defineStore('booksStore', {
  state() {
    return {
      books: [],
    };
  },
  actions: {
    async fetchBooks() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        if (response.status === 200) {
          console.log('🟢 Data fetched successfully', this.books);
          this.books = data;
        } else {
          console.log('😥 Data not fetched', response.status);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async searchBook(keyword) {
      const config = useRuntimeConfig();
      // console.log('searching book', keyword);
      try {
        const response = await ofetch(
          'https://dapi.kakao.com/v3/search/book?target=title?target=authors',
          {
            method: 'GET',
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

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getBooks: (state) => state.books,
  },
});

export default useBooksStore;
