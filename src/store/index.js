import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { jwtDecode } from "jwt-decode"
import axios from 'axios'
import router from '@/router'
import Cookies from 'js-cookie'

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
            id: '',
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
                id: '',
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
        async loginUser({ }, { userNameOrEmail, password }) {
            try {
                const response = await axios.post('/user/login', {
                    userNameOrEmail: userNameOrEmail,
                    password: password,
                })

                const data = response.data
                const loginToken = data.loginToken
                const userId = data.userId

                return { status: 'success', loginToken: loginToken, userId: userId }
            } catch (error) {
                return { status: 'error' }
            }
        },
        async loginUser2Fa({ commit }, { userId, loginToken, code }) {
            try {
                const response = await axios.post('/user/login-2fa', {
                    code: code,
                    userId: userId,
                    loginToken: loginToken
                })

                var decodedToken = jwtDecode(response.data.accessToken)

                let isEmailVerified = false
                if (decodedToken.email_confirmed == 'True') {
                    isEmailVerified = true
                }

                commit('setUser', {
                    id: decodedToken.user_id,
                    username: decodedToken.given_name,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
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
                    userId: this.state.user.id,
                    refreshToken: this.state.user.refreshToken
                }, {
                    headers: {
                        Authorization: 'Bearer ' + this.state.user.accessToken
                    }
                })
                stopRefreshTokenInterval()
            } catch (error) {
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
                    userId: this.state.user.id,
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
                        userId: this.state.user.id,
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
                    userId: this.state.user.id,
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
                    userId: this.state.user.id,
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
        id: state => state.user.id
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