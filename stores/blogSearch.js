import { defineStore } from 'pinia';

const useBlogSearch = defineStore('blogStore', {
  state() {
    return {
      blogList: [],
    };
  },

  actions: {
    async fetchBlog(keyword) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch('https://dapi.kakao.com/v2/search/blog', {
          params: {
            query: keyword,
          },
          headers: {
            Authorization: `KakaoAK ${config.public.kakaoAPI}`,
          },
        });
        if (!response.meta.is_end) {
          console.log('Data fetched successfully', response);
          this.blogList = response.documents;
        }
      } catch (error) {
        console.warn(error);
      }
    },
  },
});

export default useBlogSearch;
