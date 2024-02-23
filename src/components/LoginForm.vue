<!--suppress ALL -->
<template>
    <form @submit.prevent="submitForm">
        <div>
            <label>Username or email</label>
            <input type="text" name="username" v-model="username" minlength="4" maxlength="254" required>
        </div>

        <div>
            <label>Password</label>
            <input type="password" name="password" v-model="password" minlength="12" maxlength="64" required>
        </div>

        <div>
            <button>Log in</button>
        </div>
    </form>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    methods: {
        ...mapActions(['loginUser']),
        async submitForm() {
            try {
                await this.loginUser({
                    username: this.username,
                    password: this.password
                });

            } catch (error) {
                console.error('Login failed:', error);
            }
        }
    }
}
</script>