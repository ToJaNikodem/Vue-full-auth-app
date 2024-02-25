<!--suppress ALL -->
<template>
    <form @submit.prevent="submitForm">
        <div>
            <label>Username</label>
            <input type="text" name="username" v-model="username" minlength="4" maxlength="40" required>
        </div>
        <div>
            <label>E-mail</label>
            <input type="email" name="email" v-model="email" minlength="4" maxlength="254" required>
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password" v-model="password" minlength="10" maxlength="64" required>
        </div>
        <div>
            <label>Confirm password</label>
            <input type="password" name="re_password" v-model="re_password" minlength="10" maxlength="64" required>
        </div>
        <div>
            <span v-if="error">{{ error }}</span>
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
            error: '',
        }
    },
    methods: {
        ...mapActions(['signupUser']),
        async submitForm() {
            try {
                const response = await this.signupUser({
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    re_password: this.re_password,
                });
                this.error = response
                console.log(this.error)
                console.log(this.error['username'])
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>

