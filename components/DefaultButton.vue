<template>
    <button :class="btnClass">
      <slot>{{ props.title }}</slot>
    </button>
  </template>


<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  title: { type:String, default: '' }
})

const btnClass = computed(() => {
  let base = "rounded focus:outline-none "
  if (props.variant === 'primary') {
    base += "bg-blue-500 hover:bg-blue-600 text-white "
  } else if (props.variant === 'secondary') {
    base += "bg-gray-500 hover:bg-gray-600 text-white "
  } else {
    base += "bg-gray-200 text-black "
  }
  
  if (props.size === 'sm') {
    base += "px-2 py-1 text-sm"
  } else if (props.size === 'lg') {
    base += "px-6 py-3 text-lg"
  } else {
    base += "px-4 py-2"
  }
  
  return base
})
</script>