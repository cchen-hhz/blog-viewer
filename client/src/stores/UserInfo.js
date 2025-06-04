import { ref } from 'vue';

export function useUserInfo() {
    const LoginStatus = ref(false);
    const user = ref();

    if (window.localStorage.getItem('user')) {
        user.value = JSON.parse(window.localStorage.getItem('user'));
        LoginStatus.value = true;
    }
    return {LoginStatus, user};
}

export function setUserInfo(info) {
    window.localStorage.setItem('user', JSON.stringify(info));
    return true;
}

