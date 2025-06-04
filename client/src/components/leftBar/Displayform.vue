<script setup>

const prop = defineProps({
  itemLists: {
    type: Array,
  }
});

import {useUserInfo} from '@/stores/UserInfo.js'; 
const {user} = useUserInfo();

const parsePath = (path) => {
  return path.replace('/:uid', `/${user?.value?.uid}`);
};

</script>


<template>
  <div class="login-form">
    <nav class="nav-bar">
      <div v-for="(item,index) in prop.itemLists" :id=index class="nav-item">
        <RouterLink :to="parsePath(item.path)" class="nav-link">
          {{ item.name }}
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.login-form {
  position: fixed;
  width: 250px;
  left: 0;
}

.nav-bar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 10px 0;
  margin: 10px 0;

  width: 100%;
  height: 30px;

  font-size: 20px;
  cursor: pointer;

  transition: background-color 0.2s ease;
}
.nav-item:hover {
  background-color: #c79292;
  font-weight: bold;
}

.nav-link {
  color: #333;
  text-decoration: none;
  text-align: center;
  width: 100%;
}

</style>