import { defineNuxtPlugin } from '#app';
import { Quasar, Notify, Dialog, Loading, QBtn, QTooltip, QTab, QTabPanel, QTabs, QTabPanels, QInput, QSelect, QIcon, QDialog } from 'quasar'; // ✅ QBtn 추가


import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.vueApp.component('q-dialog', QDialog); // ✅ q-dialog 전역 등록
    nuxtApp.vueApp.component('q-icon', QIcon); // ✅ q-icon 전역 등록
    nuxtApp.vueApp.component('q-input', QInput); // ✅ q-input 전역 등록
    nuxtApp.vueApp.component('q-select', QSelect); // ✅ q-select 전역 등록
    nuxtApp.vueApp.component('q-btn', QBtn); // ✅ q-btn 전역 등록
    nuxtApp.vueApp.component('q-tooltip', QTooltip); // ✅ q-tooltip 전역 등록
    nuxtApp.vueApp.component('q-tab', QTab); // ✅ q-tab 전역 등록
    nuxtApp.vueApp.component('q-tab-panel', QTabPanel); // ✅ q-tab-panel 전역 등록
    nuxtApp.vueApp.component('q-tabs', QTabs); // ✅ q-tabs 전역 등록
    nuxtApp.vueApp.component('q-tab-panels', QTabPanels); // ✅ q-tab-panels 전역 등록
    // Quasar 플러그인 사용 설정
    nuxtApp.vueApp.use(Quasar, {
      plugins: { Notify, Dialog, Loading }, // 사용하려는 Quasar 플러그인 명시
      config: {
        notify: { position: 'top', timeout: 3000 }, // Notify 설정 (선택 사항)
      },
    });
  }
});
