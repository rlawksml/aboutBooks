import { defineStore } from 'pinia';

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
        this.books = data;
        if (response.status === 200) {
          console.log('Data fetched successfully', this.books);
        } else {
          console.log('Data not fetched', response.status);
        }
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
