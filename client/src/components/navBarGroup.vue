<script setup>
  import leftBarTable from './leftNavBar.vue';
  import topNavTable from './topNavBar.vue';
  import { leftBarShow } from '@/stores/navBar';
</script>

<template>
  <topNavTable />
  <Transition name="left-fade">
    <leftBarTable v-if="leftBarShow"/>
  </Transition>
</template>

<style scoped>
  .left-fade-enter-active, .left-fade-leave-active {
    transition: all 0.3s ease;
  }

  .left-fade-enter-from, .left-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
</style>