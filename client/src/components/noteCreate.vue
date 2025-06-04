<script setup>
  import api from '@/api/apiPack.js';
  import { ref, registerRuntimeCompiler } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserInfo } from '@/stores/UserInfo.js';

  const { user } = useUserInfo();

  const router = useRouter();

  const title = ref('');
  const content = ref('');

  const createNote = async () => {
    const note = new api.note.note(title.value, content.value);
    if(!confirm(`为 ${user.value.username} 创建笔记 ${title.value} 吗？`)) return;
    const token = user.value.token;
    const result = await api.note.create(note, token);
    if (result.status === 201) {
      alert('笔记创建成功！');
      router.push('/home'); 
    } else {
      alert(`笔记创建失败：${result.data.message || '忘写了'}`);
    }
  }
</script>

<template>
  <div class="main-index">
    <h1>创建笔记</h1>
    
    <input type="text" v-model="title" placeholder="笔记标题" required />
    <div class="clip-line"></div>

    <textarea v-model="content" placeholder="笔记内容" required></textarea>

    <button @click="createNote">创建笔记</button>
  </div>
</template>

<style scoped>
  .clip-line {
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin: 20px 0;
  }

  .main-index {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
  }
  
  .main-index input {
    width: 700px;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .main-index textarea {
    width: 700px;
    height: 400px;
    padding: 10px;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .main-index button {
    width: 220px;
    padding: 12px;
    font-size: 20px;
    background: linear-gradient(90deg, #ffb347 0%, #ffcc33 100%);
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  .main-index button:hover {
    background: linear-gradient(90deg, #ff9900 0%, #ffb347 100%);
  }
</style>