<script setup>
  import { useUserInfo } from '@/stores/UserInfo';
  const { LoginStatus, user } = useUserInfo();

  import api from '@/api/apiPack.js';
  import { ref } from 'vue';

  import navBarGroup from '@/components/navBarGroup.vue';
  import noteCreatePage from '@/components/noteCreate.vue';

</script>

<template>
  <navBarGroup />
  <div v-if="!LoginStatus" class="need-login">
    <h1>你还没登录哦</h1>
    <p>登录后才能创建笔记</p>
    <RouterLink to="/login">登录</RouterLink>
    <br>
    <RouterLink to="/register">注册</RouterLink>
  </div>

  <div v-else class="main-index">
    <noteCreatePage />
  </div>
</template>

<style scoped>
.need-login {
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
}
.need-login a {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e79511;
  color: black;
  text-decoration: none;
  border-radius: 5px;

  transition: all 0.15s ease;
}

.need-login a:hover {
  opacity: 0.7;
}

.main-index {
  text-align: center;
}
</style>