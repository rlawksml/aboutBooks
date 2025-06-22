
<template>
    <div>
        <Header/>
        <slot/>
        <!-- <Footer/> -->
         <LoginModal/>
    </div>
</template>

<script setup lang="ts">
import { useAppConfig, useHead } from '#imports'
import LoginModal from '~/components/LoginModal.vue';
const config = useAppConfig()

useHead({
  title: config.title,
  meta: [
    { name: 'description', content: config.description }
  ]
})

</script>


<style lang="scss" scoped>

</style>