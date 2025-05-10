import { defineStore } from 'pinia';

const useYoutbueSearch = defineStore('youtubeStore', {
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

        console.log('Data fetched successfully', response);
        if (response.status === 200) {
          console.log('Data fetched successfully', response);
          this.youtubes = response;
        }
      } catch (error) {
        console.warn(error);
      }
    },
  },
});

export default useYoutbueSearch;
