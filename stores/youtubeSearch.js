import { defineStore } from 'pinia';

const useYoutubeSearch = defineStore('youtubeStore', {
  state() {
    return {
      youtubes: [],
    };
  },

  actions: {
    async fetchYoutube(keyword) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch('https://dapi.kakao.com/v2/search/vclip', {
          params: {
            query: keyword,
          },
          headers: {
            Authorization: `KakaoAK ${config.public.kakaoAPI}`,
          },
        });
        if (!response.meta.is_end) {
          console.log('Data fetched successfully', response);
          this.youtubes = response.documents;
        }
      } catch (error) {
        console.warn(error);
      }
    },
  },
});

export default useYoutubeSearch;
