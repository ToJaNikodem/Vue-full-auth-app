<template>
    <div>
        <div>
            <div>
                <h1>Log in</h1>

                <form @submit.prevent="submitForm">
                    <div>
                        <label>Username or email</label>
                        <div>
                            <input type="text" name="username" v-model="username">
                        </div>
                    </div>

                    <div>
                        <label>Password</label>
                        <div>
                            <input type="password" name="password" v-model="password">
                        </div>
                    </div>

                    <div>
                        <div>
                            <button>Log in</button>
                        </div>
                    </div>
                </form>

                <hr>

                <router-link to="/signup">Click here</router-link> to sign up!
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'LoginView',
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