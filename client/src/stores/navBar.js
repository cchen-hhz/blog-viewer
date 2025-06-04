import { ref, onMounted } from 'vue';

const leftBarShow = ref(false);

const toggleLeftBar = () => {
  leftBarShow.value = !leftBarShow.value;
};

export { leftBarShow, toggleLeftBar };