<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import {useUserInfo} from '@/stores/UserInfo.js';
  const {LoginStatus, user} = useUserInfo();

  import Displayform from './leftBar/Displayform.vue'
  import LoginList from './leftBar/LoginList';
  import UserList from './leftBar/UserList';

  const route = useRoute();
  const router = useRouter();

  const logout = () => {
    if(confirm('确定吗？') === true) {
      window.localStorage.removeItem('user');
      router.push('/home');
      location.reload();
    }
  }

</script>

<template>
  <div class="left-nav-bar">
    <div v-if="!LoginStatus">
      <div class="login-tip">
        请先登录QAQ
      </div>      
      <Displayform :itemLists="LoginList"/>
    </div>
    <div v-else>
      <div class="login-tip" style="margin-bottom: 10px">
        欢迎回来，<span style="color:black">{{user.username}} </span>
      </div>
      <button @click="logout" class="logout-button">注销？</button>
      <Displayform :itemLists="UserList"/>
    </div>
  </div>
</template>

<style scoped>
.logout-button {
  width: 100%;
  height: 50px;
  border: none;
  font-size: 20px;
  color: black;
  margin-bottom: 30px;

  cursor: pointer;
  transition: background-color 0.1s ease;
}

.logout-button:hover {
  background-color: #e25858;
  font-weight: bold;
}

.login-tip {
  color: red;
  font-size: 20px;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 50px;
}

.left-nav-bar {
  position: fixed;
  top: 65px;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: calc(100% - 65px);
  background-color: blanchedalmond;
}

</style>