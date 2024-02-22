import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { jwtDecode } from "jwt-decode"
import axios from 'axios'
import router from '@/router'

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
        }
    },
    actions: {
        async loginUser({ commit }, { username, password }) {
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

                router.push('/')

            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        async logoutUser({ commit }) {
            try {
                const response = await axios.post('/logout', {
                    refresh: this.state.user.refreshToken
                });

                commit('clearUser')
                router.push('/login')

            } catch (error) {
                console.error('Logout failed:', error);
                throw error;
            }
        },
        async signupUser({ commit }, { username, email, password, re_password }) {
            try {
                if (password == re_password) {
                    const response = await axios.post('/signup', {
                        username: username,
                        email: email,
                        password: password,
                    })
                    router.push('/login')
                } else {
                    throw error;
                }
            } catch (error) {
                console.error('Logout failed:', error);
                throw error;
            }
        },
    },
    getters: {
        isAuthenticated: state => state.user.isAuthenticated 
    },
    plugins: [new VuexPersistence().plugin]
})

export default store