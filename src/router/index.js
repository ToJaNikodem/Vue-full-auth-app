import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import LoginView from '@/views/LoginView'
import SignupView from '@/views/SignupView'
import store from '@/store'
import UserDeleteView from "@/views/UserDeleteView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignupView
    },
    {
        path: '/user-delete',
        name: 'user-delete',
        component: UserDeleteView
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from) => {
    if (
        !store.getters.isAuthenticated &&
        to.name == 'home'
    ) {
        return { name: 'login' }
    }
})

export default router