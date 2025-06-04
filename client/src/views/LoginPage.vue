<script setup>
  import navBarGroup from '@/components/navBarGroup.vue';
  import {useUserInfo} from '@/stores/UserInfo';
  import alreadyLogged from '@/components/login_pages/alreadyLogged.vue';
  import LoginForm from '@/components/login_pages/loginUtil.vue';

  const {LoginStatus, user} = useUserInfo();
</script>

<template>
  <navBarGroup />
  <div class="main-index">
    <div v-if="LoginStatus">
      <alreadyLogged />
    </div>
    <div v-else>
      <LoginForm />
    </div>
  </div>
</template>

<style scoped>
.main-index {
  margin-left: 350px;
}
</style>