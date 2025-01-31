<script setup lang="ts">
import { useAppConfig, useHead } from '#imports'
const config = useAppConfig()

useHead({
  title: config.title,
  meta: [
    { name: 'description', content: config.description }
  ]
})

</script>

<template>
    <div>
        <Header/>
        <slot/>
        <Footer/>
    </div>
</template>

<style lang="scss" scoped>

</style>