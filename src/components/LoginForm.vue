<!--suppress ALL -->
<template>
    <form @submit.prevent="submitForm">
        <div>
            <label>Username or email</label><br>
            <input class=" rounded-md h-10 w-96 mb-5 text-black px-2" type="text" name="username" v-model="username" minlength="4" maxlength="254" required>
        </div>

        <div>
            <label>Password</label><br>
            <input class=" rounded-md h-10 w-96 text-black px-2" type="password" name="password" v-model="password" minlength="10" maxlength="64" required>
        </div>
        <div>
            <span v-if="error">{{ error }}</span>
        </div>
        <div>
            <button class=" rounded-md bg-gray-300 text-black w-24 h-10 mt-5 mb-5" >Log in</button>
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
            error: '',
            isLoading: false,
        }
    },
    methods: {
        ...mapActions(['loginUser']),
        async submitForm() {
            try {
                this.isLoading = true
                this.$emit('isLoadingChange', this.isLoading)

                await this.loginUser({
                    username: this.username,
                    password: this.password
                });

            } catch (error) {
                this.isLoading = false
                this.$emit('isLoadingChange', this.isLoading)
                this.error = 'Invalid username or password'
            }
        }
    }
}
</script>