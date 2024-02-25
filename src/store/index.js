import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import {jwtDecode} from "jwt-decode"
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
            id: null,
            username: '',
            accessToken: '',
            refreshToken: '',
            isAuthenticated: false
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        clearUser(state) {
            state.user = {
                id: null,
                username: '',
                accessToken: '',
                refreshToken: '',
                isAuthenticated: false
            };
        },
        setToken(state, {accessToken, refreshToken}) {
            state.user.accessToken = accessToken;
            state.user.refreshToken = refreshToken;
        }
    },
    actions: {
        async loginUser({commit}, {username, password}) {
            try {
                const response = await axios.post('/login', {
                    username: username,
                    password: password,
                });

                const userData = response.data;

                const decodedToken = jwtDecode(userData.refresh)

                commit('setUser', {
                    id: decodedToken.user_id,
                    username: decodedToken.username,
                    accessToken: userData.access,
                    refreshToken: userData.refresh,
                    isAuthenticated: true
                });

                await router.push('/')

            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        async logoutUser({commit}) {
            try {
                await axios.post('/logout', {
                    refresh: this.state.user.refreshToken
                });

            } catch (error) {
                console.error('Full logout failed:', error);
            }
            commit('clearUser')
            await router.push('/login')
        },
        async signupUser({commit}, {username, email, password, re_password}) {
            try {
                if (password === re_password) {
                    await axios.post('/signup', {
                        username: username,
                        email: email,
                        password: password,
                    });
                    
                    await router.push('/login')
                } else {
                    throw new Error('Passwords do not match');
                }
            } catch (error) {
                return error.response.data
            }
        },
        async refreshToken({commit}) {
            try {
                const response = await axios.post('/token_refresh', {
                    refresh: this.state.user.refreshToken
                });
                const tokenData = response.data;

                commit('setToken', {
                    accessToken: tokenData.access,
                    refreshToken: tokenData.refresh,
                })
            } catch (error) {
                console.error('Refresh failed:', error);
            }
        },
        async userDelete({dispatch}, {password}) {
            try {
                await axios.post('/user_delete', {
                    username: this.state.user.username,
                    password: password,
                },
                    {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.user.accessToken
                    }
                })
                dispatch('logoutUser')
            } catch (error) {
                throw error;
            }
        }
    },
    getters: {
        isAuthenticated: state => state.user.isAuthenticated
    },
    plugins: [vuexCookie.plugin]
})

const refreshTokenInterval = setInterval(async () => {
    if (store.state.user.isAuthenticated) {
        await store.dispatch('refreshToken');
    }
}, 4 * 60 * 1000);


export default store