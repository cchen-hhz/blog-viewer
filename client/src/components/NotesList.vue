<script setup>
  import { onMounted, ref } from 'vue';
  import api from '@/api/apiPack.js';

  const prop = defineProps({
    uid_filter: {
      type: String,
      default: '-NoFilter'
    }
  });

  const noteList = ref([]);
  const fetchStatus = ref(0);
  const fetchNotes = async () => {
    const response = await api.note.query_all();
    if (response.status === 200) {
      noteList.value = response.data.filter((note) => {
        return prop.uid_filter === '-NoFilter' || note.author_uid === prop.uid_filter;
      });
      fetchStatus.value = 1;
    } else {
      console.error('Failed to fetch notes:', response);
      fetchStatus.value = -1;
    }
  }
  import singleNote from './utils/singleNote.vue';

  onMounted(() => {
    fetchNotes();
  })
</script>

<template>
  <div v-if="fetchStatus === 0" class="main-index">
    <h1>加载中</h1>
  </div>
  <div v-else-if="fetchStatus === -1" class="main-index">
    <h1>服务器锅了（哭）</h1>
    <button @click="fetchNotes">重试</button>
  </div>
  <div v-else class="notes-list">
    <singleNote v-for="note in noteList" :key="note.uid" :note="note" class="per-note"/>
  </div>
</template>

<style scoped>
  .main-index {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 350px;
  }
  .notes-list {
    flex: 3;
    display: flex;
    flex-direction: column;
  }
  .per-note {
    margin: 10px 0;
    width: 100%;
  }
</style>