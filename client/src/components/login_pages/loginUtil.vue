<script setup>
  import api from '@/api/apiPack.js';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { setUserInfo } from '@/stores/UserInfo.js';

  const router = useRouter();

  const username = ref('');
  const password = ref('');
  const status_message = ref('');
  const status = ref(0);

  const clearUser = () => {
    username.value = '';
    password.value = '';
  }

  const login = async () => { 
    if(status.value === 1) return;
    const result = await api.user.qualify(username.value, password.value, true);
    if (result.status === 200) {
      setUserInfo({
        username: username.value,
        token: result.data.token,
        uid: result.data.uid,
      });
      status.value = 1;
      status_message.value = '登录成功,3s 后跳转';
      setTimeout(() => {
        router.push('home');
      }, 3000); 
    }
    else {
      if(result.status === 401) {
        status_message.value = '账户或密码错误';
      } 
      else if(result.status === 404) {
        status_message.value = '用户不存在，快去注册吧';
      } 
      else {
        status_message.value = '服务器错误，联系管理员（哭）';
      }
      clearUser();
    }
  }
</script>

<template>
  <div>
    <div class="main-index">
      <h1>欢迎登录</h1>
    </div>
    <form @submit.prevent="login" class="login-form">
      <label for="username">用户名:</label>
      <input type="text" id="username" v-model="username" required />
      <hr>
      <label for="password">密码:</label>
      <input type="password" id="password" v-model="password" required />
      <hr>
      <button type="submit">登录</button>
    </form>
    <div v-if="status_message" class="status-message">
      {{ status_message }}
    </div>
  </div>
</template>

<style scoped>
.login-form {
  margin-top: 30px;
  max-width: 350px;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form label {
  display: block;
  margin-bottom: 0.5em;
}

.login-form input {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form button {
  width: 100%;
  padding: 0.5em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0056b3;
}

.status-message {
  margin-top: 20px;
  color: red;
  font-weight: bold;
}
</style>