<script setup>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const prop = defineProps({
    note: {
      type: Object,
      required: true
    }
  });

  const router = useRouter();

  const makeContent = computed(() => {
    if(prop.note.content.length > 100) {
      return prop.note.content.slice(0, 100) + '...';
    }
    return prop.note.content;
  });

  const gotoNote = () => {
    router.push({ name: 'note-single' , params: { noteId: prop.note.id }, props: true});
  }

</script>

<template>
  <div class="single-note">
    <div class="title" @click="gotoNote">{{ prop.note.title }}</div>
    <div class="author">By: {{ prop.note.author }}</div>
    <div class="divider"></div>
    <div class="content">摘要：{{ makeContent }}</div>
  </div>
</template>

<style scoped>
  .single-note {
    border: 1px solid #BEB0A5;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    height: 180px;
  }
  .title {
    flex: 1.5;
    font-size: 22px;
    font-weight: bold;
    color: #333;
    background-color: beige;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor:pointer;
    transition: opacity 0.3s ease;
  }
  .title:hover {
    opacity: 0.8;
    color: #48c2eb;
  }


  .author {
    margin-top: 5px;
    flex: 1;
    font-size: 18px;
    color: #666;

    text-align: center;
  }
  .content {
    flex: 3;
    font-size: 16px;
    color: #444;
    padding: 0 5px;
  }
  .divider {
    height: 1.4px;
    width: 85%;
    margin: 8px auto;
    background: linear-gradient(90deg, #b0b0b0 0%, #444 100%);
    border-radius: 1px;
    opacity: 0.7;
  }
</style>