<template>
  <div>
    <Header />
    <slot />
    <!-- <Footer/> -->
    <LoginModal />
  </div>
</template>

<script setup lang="ts">
import { useAppConfig, useHead } from '#imports'
import LoginModal from '~/components/LoginModal.vue';
import useLoginStore from '~/stores/login';
const config = useAppConfig()
const loginStore = useLoginStore();

useHead({
  title: config.title,
  meta: [
    { name: 'description', content: config.description }
  ]
})

onMounted(() => {
  // This is a good place to initialize any global state or perform side effects
  // For example, you might want to check if the user is logged in
  loginStore.getLocalStorageUser();
});



</script>


<style lang="scss" scoped></style>