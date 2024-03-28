import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { jwtDecode } from "jwt-decode"
import axios from 'axios'
import router from '@/router'
import Cookies from 'js-cookie'

axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log('Response Interceptor:', response);
    return response;
}, function (error) {
    // Do something with response error
    console.error('Response Interceptor Error:', error);
    return Promise.reject(error);
});

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log('Request Interceptor:', config);
    return config;
}, function (error) {
    // Do something with request error
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
});

const vuexCookie = new VuexPersistence({
    restoreState: (key, storage) => Cookies.getJSON(key),
    saveState: (key, state, storage) =>
        Cookies.set(key, state, {
            expires: 30
        }),
    modules: ['user']
})

const store = new Vuex.Store({
    state: {
        user: {
            id: null,
            username: '',
            nickname: '',
            accessToken: '',
            refreshToken: '',
            isAuthenticated: false,
            isEmailVerified: false,
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        clearUser(state) {
            state.user = {
                id: null,
                username: '',
                accessToken: '',
                refreshToken: '',
                isAuthenticated: false
            }
        },
        setToken(state, { accessToken, refreshToken }) {
            state.user.accessToken = accessToken
            state.user.refreshToken = refreshToken
        },
        verifyEmail(state) {
            state.user.isEmailVerified = true
        },
    },
    actions: {
        async loginUser({ commit }, { username, password }) {
            try {
                const response = await axios.post('/login', {
                    username: username,
                    password: password,
                })

                const userData = response.data
                const decodedToken = jwtDecode(userData.refresh)

                commit('setUser', {
                    id: decodedToken.user_id,
                    username: decodedToken.username,
                    nickname: decodedToken.nickname,
                    accessToken: userData.access,
                    refreshToken: userData.refresh,
                    isAuthenticated: true,
                    isEmailVerified: decodedToken.is_email_verified,
                })
                startRefreshTokenInterval()
                return { 'status': 'success' }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    return { 'status': 'error', 'username_or_email': 'invalid' }
                } else {
                    return { 'status': 'error', 'message': 'An error occurred!' }
                }
            }
        },
        async logoutUser({ commit }) {
            try {
                await axios.post('/logout', {
                    refresh: this.state.user.refreshToken
                })
                stopRefreshTokenInterval()
            } catch (error) {
                console.error('Full logout failed!')
            }
            commit('clearUser')
            await router.push('/login')
        },
        async signupUser({ }, { username, email, password, re_password }) {
            try {
                if (password === re_password) {
                    await axios.post('/signup', {
                        username: username,
                        email: email,
                        password: password,
                    })
                    return { 'status': 'success' }
                } else {
                    return { 'status': 'error', 'password': 'no_match' }
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    return error.response.data
                } else {
                    return { status: 'error', message: 'An error occurred!' }
                }
            }
        },
        async refreshToken({ commit, dispatch }) {
            try {
                const response = await axios.post('/token_refresh', {
                    refresh: this.state.user.refreshToken
                })
                const tokenData = response.data

                commit('setToken', {
                    accessToken: tokenData.access,
                    refreshToken: tokenData.refresh,
                })
                return true
            } catch (error) {
                dispatch('logoutUser')
                return false
            }
        },
        async deleteUser({ }, { password }) {
            try {
                await axios.post('/user_delete', {
                    username: this.state.user.username,
                    password,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.user.accessToken
                    }
                })
                return { status: 'success' }
            } catch (error) {
                if (error.response.status === 400) {
                    return { status: 'error', password: 'invalid' }
                } else {
                    return { status: 'error', message: 'An error occurred!' }
                }
            }
        },
        async changeUsername({ }, { new_nickname }) {
            try {
                await axios.post('/nickname_change', {
                    username: this.state.user.username,
                    new_nickname,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.user.accessToken
                    }
                })
                this.state.user.nickname = new_nickname
                return { status: 'success' }
            } catch (error) {
                return { status: 'error', message: 'An error occurred!' }
            }
        },
        async changePassword({ }, { old_password, new_password }) {
            try {
                await axios.post('/password_change', {
                    username: this.state.user.username,
                    old_password,
                    new_password,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.user.accessToken
                    }
                })
                return { status: 'success' }
            } catch (error) {
                return { status: 'error', message: 'An error occurred!' }
            }
        }
    },
    getters: {
        isAuthenticated: state => state.user.isAuthenticated,
        isEmailVerified: state => state.user.isEmailVerified,
        nickname: state => state.user.nickname,
        username: state => state.user.username,
        accessToken: state => state.user.accessToken,
    },
    plugins: [vuexCookie.plugin]
})

let refreshTokenInterval

export function startRefreshTokenInterval() {
    refreshTokenInterval = setInterval(() => {
        store.dispatch('refreshToken')
    }, 4 * 60 * 1000)
}

export function stopRefreshTokenInterval() {
    clearInterval(refreshTokenInterval)
}

export default store