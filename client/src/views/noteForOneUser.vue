<script setup>
  import { ref } from 'vue';
  import { useUserInfo } from '@/stores/UserInfo.js';
  const { LoginStatus, user } = useUserInfo();

  import navBarGroup from '@/components/navBarGroup.vue';
  import NotesList from '@/components/NotesList.vue';
</script>

<template>
  <navBarGroup />
  <!--这段字应该是不用加的，正常来说不可能在不登陆情况下进入这里-->
  <div v-if="!LoginStatus" class="need-login">
    <h1>你还没登录哦</h1>
    <p>登录后才能查看笔记</p>
    <RouterLink to="/login">登录</RouterLink>
    <br>
    <RouterLink to="/register">注册</RouterLink>
  </div>

  <div v-else class="main-index">
    <h1>{{ user.username }} 的笔记</h1>
    <NotesList :uid_filter='user.uid' />
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
  margin-left: 350px;
  width: 70%;
}

</style>