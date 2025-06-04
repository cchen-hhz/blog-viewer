import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/Homepage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import PageNotFound from '@/views/404NotFound.vue';
import createNotePage from '@/views/createNote.vue';
import noteOneUser from '@/views/noteForOneUser.vue';
import noteSinglePage from '@/views/oneNoteView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', name: 'home', component: HomeView},
        {path: '/login', name: 'login', component: LoginPage},
        {path: '/register', name: 'register', component: RegisterPage},
        {path: '/note/modify/create', name: 'create-note', component: createNotePage},
        {path: '/note/show/:uid' , name: 'note-for-one-user', component: noteOneUser},
        {path: '/note/single/:noteId', name: 'note-single' ,component: noteSinglePage},
        {path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound}
    ],
});

export default router;
