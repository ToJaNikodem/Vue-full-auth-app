import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import LoginView from '@/views/LoginView'
import SignupView from '@/views/SignupView'
import store from '@/store'
import UserDeleteView from '@/views/UserDeleteView.vue'
import EmailVerificationView from '@/views/EmailVerificationView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ChangeUsernameView from '@/views/ChangeUsernameView.vue'
import ChangePasswordView from '@/views/ChangePasswordView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView
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
        path: '/delete-user',
        name: 'delete-user',
        component: UserDeleteView
    },
    {
        path: '/verify/:uid/:token',
        name: 'email-verification',
        component: EmailVerificationView,
        props: true
    },
    {
        path: '/change-username',
        name: 'change-username',
        component: ChangeUsernameView,
    },
    {
        path: '/change-password',
        name: 'change-password',
        component: ChangePasswordView,
    }
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