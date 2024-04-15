import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/authentication/LoginView.vue'
import SignupView from '@/views/authentication/SignupView.vue'
import UserDeleteView from '@/views/profile/UserDeleteView.vue'
import EmailVerificationView from '@/views/authentication/EmailVerificationView.vue'
import ProfileView from '@/views/profile/ProfileView.vue'
import ChangeUsernameView from '@/views/profile/ChangeUsernameView.vue'
import ChangePasswordView from '@/views/profile/ChangePasswordView.vue'
import ResetPasswordView from '@/views/authentication/SendResetPasswordView.vue'
import PasswordResetView from '@/views/authentication/PasswordResetView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import Login2faView from '@/views/authentication/Login2faView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/login2fa/:uid/:loginToken',
        name: 'login2fa',
        component: Login2faView
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
    },
    {
        path: '/change-password',
        name: 'change-password',
        component: ChangePasswordView,
        meta: { requiresAuth: true },
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: ResetPasswordView,
    },
    {
        path: '/:pathMatch(.*)*',
        component: PageNotFound,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else if (store.getters.isAuthenticated) {
        if (to.path === '/login' || to.path === '/signup') {
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})


export default router