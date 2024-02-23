<!--suppress ALL -->
<template>
    <form @submit.prevent="submitForm">
        <div>
            <label>Username</label>
            <input type="text" name="username" v-model="username">
        </div>
        <div>
            <label>E-mail</label>
            <input type="email" name="email" v-model="email">
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password" v-model="password">
        </div>
        <div>
            <label>Confirm password</label>
            <input type="password" name="re_password" v-model="re_password">
        </div>
        <div>
            <button>Sign up</button>
        </div>
    </form>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            re_password: '',
            errors: []
        }
    },
    methods: {
        ...mapActions(['signupUser']),
        async submitForm() {
            try {
                await this.signupUser({
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    re_password: this.re_password,
                });


            } catch (error) {
                console.error('Signup failed:', error);
            }
        }
    }
}
</script>

