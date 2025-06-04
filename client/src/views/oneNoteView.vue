<script setup>
  import { onMounted, ref, computed } from 'vue'; 
  import { useRoute, useRouter } from 'vue-router';
  import navBarGroup from '@/components/navBarGroup.vue';
  import { useUserInfo } from '@/stores/UserInfo.js';
  
  const { LoginStatus, user } = useUserInfo();
  const route = useRoute();
  const router = useRouter();
  const noteId = route.params.noteId;
  import api from '@/api/apiPack.js';

  const showNote = ref();
  const fetchStatus = ref(0);

  const fetchNote = async () => {
    const response = await api.note.note_query(noteId);
    if (response.status === 200) {
      showNote.value = response.data;
      fetchStatus.value = 1;
    }
    else {
      console.error('获取笔记失败:', response);
      fetchStatus.value = -1;
    }
  };

  const userMatch = computed(() => {
    return LoginStatus.value && user.value.uid === showNote.value.author_uid;
  });

  const deleteNote = async () => {
    if(!confirm(`删除 ${showNote.value.title} ?`)) return;
    const response = await api.note.remove(noteId, user.value.token);
    if (response.status === 200) {
      alert('笔记删除成功！');
      router.push('/home');
    } else {
      alert(`笔记删除失败：${response.data.message || '忘写了'}`);
    }
  }

  onMounted(fetchNote);



</script>

<template>
  <navBarGroup />
  <div v-if="fetchStatus === 0" class="main-index">
    <h1>加载中...</h1>
  </div>
  <div v-else-if="fetchStatus === -1" class="main-index">
    <h1>服务器出错了（哭）</h1>
    <button @click="fetchNote">重试</button>
  </div>
  <div v-else class="note-viewer">
    <div class="note-card">
      <h2 class="note-title">{{ showNote.title }}</h2>
      <div class="note-meta">By：{{ showNote.author }}</div>
      <div class="note-content">{{ showNote.content }}</div>
    </div>
    <button v-if="userMatch" @click="deleteNote" class="delete-button">删除笔记</button> 
    <div v-else class="note-meta">
      登录到 {{ showNote.author }} 以编辑笔记！
    </div>
  </div>
</template>

<style scoped>
.note-viewer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.note-card {
  background: #fff8ed;
  border: 1px solid #ff9800;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
  padding: 12px 40px;
  min-width: 600px;
  max-width: 1000px;

}
.note-title {
  font-size: 50px;
  color: #ff9800;
  margin-bottom: 16px;
  padding: 0 10px;
  background-color: #f9e3c0;
}
.note-meta {
  color: #626262;
  font-size: 18px;
  margin-bottom: 24px;
}
.note-content {
  font-size: 20px;
  color: #333;
  white-space: pre-wrap;
}

.delete-button {
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
}

.note-meta {
  text-align: center;
  font-size: 20px;
  color: #ff5722;
  margin-top: 20px;
}
</style>