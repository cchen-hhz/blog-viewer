<script setup>
  import api from '@/api/apiPack.js';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import navBarGroup from '@/components/navBarGroup.vue';

  const router = useRouter();

  const username = ref('');
  const password = ref('');
  const status_message = ref('');
  const status = ref(0);

  const clearUser = () => {
    username.value = '';
    password.value = '';
  };

  const register = async () => {
    if (status.value === 1) return;
    const result = await api.user.register(username.value, password.value);
    if (result.status === 201) {
      status.value = 1;
      status_message.value = '注册成功!3s 后跳转';
      setTimeout(() => {
        router.push('home');
      }, 3000);
    } else {
      if(result.status === 500) {
        status_message.value = '服务器错误，联系管理员（哭）';
      }
      else {
        status_message.value = `注册失败：${result.data.message || `message忘设置了，快联系管理员`}`;
      }
      clearUser();
    }
  };
</script>

<template>
  <navBarGroup />
  <div class="main-index">
    <div>
      <h1>注册</h1>
    </div>
    <form @submit.prevent="register" class="login-form">
      <label for="username">用户名:</label>
      <input type="text" id="username" v-model="username" required />
      <hr>
      <label for="password">密码:</label>
      <input type="text" id="password" v-model="password" required />
      <hr>
      <button type="submit">注册</button>
    </form>
    <div v-if="status_message" class="status-message">
      {{ status_message }}
    </div>
  </div>
</template>

<style scoped>
.main-index {
  margin-left: 350px;
  padding: 5px;
}

.login-form {
  margin-top: 20px;
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