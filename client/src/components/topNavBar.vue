<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();

  import {leftBarShow, toggleLeftBar} from '@/stores/navBar.js';

  const navLists = [
    { name: '主页', path:'/' },
    { name: '新留言', path:'/note/modify/create'}
  ];

</script>

<template>
  <!--防遮挡蒙版-->
  <div style="height:65px; width:100%"></div>

  <div class="top-nav-table">
    <div class="settings" @click="toggleLeftBar">
      我的
    </div>

    <nav class="nav-bar">
      <div v-for="(item,index) in navLists" :key="index" class="nav-item">
        <router-link :to="item.path" class="nav-link">
          {{ item.name }}
        </router-link>
      </div>
    </nav>
  </div>

</template>


<style scoped>
  .settings {
    margin-left: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 24px;
    cursor: pointer;

    transition: background-color 0.3s ease;
  }
  .settings:hover {
    background-color: #ffc67c;
    font-weight: bold;
  }

  .top-nav-table {
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-flow: row;
    height : 65px;
    width: 100%;
    left:0;
    top: 0;
    align-items: stretch;
    justify-content: center;

    background-color: #ff9800;
    font-size: 22px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.10);
  }
  .nav-bar {
    display: inline-flex;
  }

  .nav-item {
    color: #333;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    cursor: pointer;

    transition: background-color 0.3s ease;
  }

  .nav-item:hover {
    background-color: #ffc67c;
    font-weight: bold;
  }

  .nav-link {
    text-decoration: none;
    color: inherit;
    width: 100%;
  }
</style>

