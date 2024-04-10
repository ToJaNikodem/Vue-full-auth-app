import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { jwtDecode } from "jwt-decode"
import axios from 'axios'
import router from '@/router'
import Cookies from 'js-cookie'

axios.interceptors.response.use(function (response) {
    console.log('Response Interceptor:', response);
    return response;
}, function (error) {
    console.error('Response Interceptor Error:', error);
    return Promise.reject(error);
});

axios.interceptors.request.use(function (config) {
    console.log('Request Interceptor:', config);
    return config;
}, function (error) {
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
            username: '',
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
                username: '',
                accessToken: '',
                refreshToken: '',
                isAuthenticated: false,
                isEmailVerified: false,
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
        async loginUser({ commit }, { userNameOrEmail, password }) {
            try {
                const response = await axios.post('/user/login', {
                    userNameOrEmail: userNameOrEmail,
                    password: password,
                })

                const userData = response.data
                const decodedToken = jwtDecode(userData.accessToken)

                let isEmailVerified = false
                if (decodedToken.email_confirmed == 'True') {
                    isEmailVerified = true
                }

                commit('setUser', {
                    username: decodedToken.given_name,
                    accessToken: userData.accessToken,
                    refreshToken: userData.refreshToken,
                    isAuthenticated: true,
                    isEmailVerified: isEmailVerified,
                })
                startRefreshTokenInterval()
                return { status: 'success' }
            } catch (error) {
                return { status: 'error' }
            }
        },
        async logoutUser({ commit }) {
            try {
                await axios.post('/user/logout', {
                    userName: this.state.user.username,
                    refreshToken: this.state.user.refreshToken
                }, {
                    headers: {
                        Authorization: 'Bearer ' + this.state.user.accessToken
                    }
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
                    await axios.post('/user/signup', {
                        userName: username,
                        email: email,
                        password: password,
                    })
                    return { status: 'success' }
                } else {
                    return { status: 'error', password: 'no_match' }
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
                const response = await axios.post('/user/refresh', {
                    userName: this.state.user.username,
                    refreshToken: this.state.user.refreshToken
                }, {
                    headers: {
                        Authorization: 'Bearer ' + this.state.user.accessToken
                    }
                })
                const tokenData = response.data

                commit('setToken', {
                    accessToken: tokenData.accessToken,
                    refreshToken: tokenData.refreshToken,
                })
                return true
            } catch (error) {
                dispatch('logoutUser')
                return false
            }
        },
        async deleteUser({ }, { password }) {
            try {
                await axios.delete('/user/delete', {
                    data: {
                        userName: this.state.user.username,
                        password: password,
                    },
                    headers: {
                        Authorization: 'Bearer ' + this.state.user.accessToken
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
        async changeUsername({ }, { newUserName }) {
            try {
                await axios.post('/user/username-change', {
                    oldUserName: this.state.user.username,
                    newUserName: newUserName,
                }, {
                    headers: {
                        Authorization: 'Bearer ' + this.state.user.accessToken
                    }
                })
                this.state.user.username = newUserName
                return { status: 'success' }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    return error.response.data
                } else {
                    return { status: 'error' }
                }
            }
        },
        async changePassword({ }, { old_password, new_password }) {
            try {
                await axios.post('/user/password-change', {
                    userName: this.state.user.username,
                    oldPassword: old_password,
                    newPassword: new_password,
                }, {
                    headers: {
                        Authorization: 'Bearer ' + this.state.user.accessToken
                    }
                })
                return { status: 'success' }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    return error.response.data
                } else {
                    return { status: 'error' }
                }
            }
        }
    },
    getters: {
        isAuthenticated: state => state.user.isAuthenticated,
        isEmailVerified: state => state.user.isEmailVerified,
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