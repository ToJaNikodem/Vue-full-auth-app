<template>
    <nav>
        <router-link to="/">Home</router-link>
        {{ isAuthenticated }}
        <span v-if="isAuthenticated">
            <button @click="logoutUser">Logout</button>
        </span>
        <span v-else>
            <router-link to="/login">Login</router-link>
        </span>
    </nav>
    <router-view />
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

