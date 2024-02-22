<template>
    <div>
        <div>
            <div>
                <h1 class="title">Sign up</h1>

                <form @submit.prevent="submitForm">
                    <div>
                        <label>Username</label>
                        <div>
                            <input type="text" name="username" v-model="username">
                        </div>
                    </div>

                    <div>
                        <label>E-mail</label>
                        <div>
                            <input type="email" name="email" v-model="email">
                        </div>
                    </div>

                    <div>
                        <label>Password</label>
                        <div>
                            <input type="password" name="password" v-model="password">
                        </div>
                    </div>

                    <div>
                        <label>Confirm password</label>
                        <div>
                            <input type="password" name="re_password" v-model="re_password">
                        </div>
                    </div>

                    <div>
                        <div>
                            <button>Sign up</button>
                        </div>
                    </div>
                </form>

                <hr>

                <router-link to="/login">Click here</router-link> to log in!
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'SignupView',
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