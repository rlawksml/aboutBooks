import { defineNuxtPlugin } from '#app';
import { Quasar, Notify, Dialog, Loading, QBtn } from 'quasar'; // ✅ QBtn 추가


import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.vueApp.component('q-btn', QBtn); // ✅ q-btn 전역 등록
    nuxtApp.vueApp.use(Quasar, {
      plugins: { Notify, Dialog, Loading }, // 사용하려는 Quasar 플러그인 명시
      config: {
        notify: { position: 'top', timeout: 3000 }, // Notify 설정 (선택 사항)
      },
    });
  }
});
