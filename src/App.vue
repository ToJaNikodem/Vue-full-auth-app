<template>
    <main>
        <nav class=" bg-slate-400 w-full h-10 ">
            <router-link to="/">Home</router-link>
            {{ isAuthenticated }}
            <span v-if="isAuthenticated">
                <button @click="logoutUser">Logout</button>
                <router-link to="/user-delete">Delete account</router-link>
            </span>
            <span v-else>
                <router-link to="/login">Login</router-link>
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
