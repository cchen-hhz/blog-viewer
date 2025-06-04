<script setup>
  import { useUserInfo } from '@/stores/UserInfo';
  const { LoginStatus, user } = useUserInfo();
</script>

<template>
  <div class="main-index">
    <h1>您已经登录辣，{{ user.username }}</h1>
    <p>去别的地方看看吧</p>
    <RouterLink to="/home">返回首页</RouterLink>
  </div>
</template>

<style scoped>
  .main-index {
    font-size: 20px;
  }
</style>