<script setup>
  import navBarGroup from '@/components/navBarGroup.vue'; 
  import NotesList from '@/components/NotesList.vue';
  import { leftBarShow, toggleLeftBar } from '@/stores/navBar';

  import fortuneTable from './sideTools/fortune.vue'

  import { useUserInfo } from '@/stores/UserInfo.js'; 
  import { onMounted, ref } from 'vue';
  const {LoginStatus, user} = useUserInfo();

  onMounted(() => {
    if(leftBarShow.value === false) toggleLeftBar();
  })

</script>

<template>
  <!--顶部栏和侧边栏的设置-->
  <navBarGroup />

  <!--主体区域的设置，按照 3:1:1.5 划分，中间为空-->
  <div class="main-content">
    <!--内部设置 flex=3 -->
    <NotesList />

    <!--分隔板-->
    <div style="flex: 1"></div>

    <div style="flex: 1.5" >
      <fortuneTable />
      <div style="margin-top: 20px; text-align: center;">
        <p>别的小组件正在赶来喵喵喵</p>
        
      </div>
    </div>

  </div>
</template>

<style scoped>

  .main-content {
    margin-left: 350px;
    width: 70%;
    display: flex;

  }
  
</style>