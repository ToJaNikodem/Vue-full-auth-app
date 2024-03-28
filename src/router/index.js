import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import HomeView from '@/views/HomeView'
import LoginView from '@/views/authentication/LoginView'
import SignupView from '@/views/authentication/SignupView'
import UserDeleteView from '@/views/profile/UserDeleteView.vue'
import EmailVerificationView from '@/views/authentication/EmailVerificationView.vue'
import ProfileView from '@/views/profile/ProfileView.vue'
import ChangeUsernameView from '@/views/profile/ChangeUsernameView.vue'
import ChangePasswordView from '@/views/profile/ChangePasswordView.vue'
import ResetPasswordView from '@/views/authentication/SendResetPasswordView.vue'
import PasswordResetView from '@/views/authentication/PasswordResetView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignupView,
    },
    {
        path: '/delete-user',
        name: 'delete-user',
        component: UserDeleteView,
    },
    {
        path: '/verify/:uid/:token',
        name: 'email-verification',
        component: EmailVerificationView,
        props: true,
    },
    {
        path: '/password-reset/:uid/:token',
        name: 'password-reset',
        component: PasswordResetView,
        props: true,
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
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: ResetPasswordView,
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