<template>
    <main>
        <nav class=" bg-slate-400 w-full h-12 text-black flex flex-row items-center">
            <router-link class=" text-xl ml-10" to="/">Home</router-link>
            <span v-if="isAuthenticated">
                <button class="text-xl ml-5" @click="logoutUser">Logout</button>
                <router-link class="text-xl ml-5 text-red-600" to="/user-delete">Delete account</router-link>
            </span>
            <span v-else>
                <router-link class="text-xl ml-5" to="/login">Login</router-link>
            </span>
        </nav>
        <router-view />
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters(['isAuthenticated'])
    },
    methods: {
        ...mapActions(['logoutUser']),
    },
}
</script>

<style scoped>
@import '../src/assets/css/main.css';
</style>
