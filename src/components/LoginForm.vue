<template>
    <form @submit.prevent="submitForm">
        <div>
            <label>Username or email</label><br>
            <input v-on:input="makeLowercase" :class="{ 'border-red-600 border-4': username_or_email_error }"
                class=" rounded-md h-10 w-96 mb-5 text-black px-2" type="text" name="username" v-model="username"
                minlength="4" maxlength="254" required>
        </div>

        <div>
            <label>Password</label><br>
            <input :class="{ 'border-red-600 border-4': username_or_email_error }"
                class=" rounded-md h-10 w-96 text-black px-2" type="password" name="password" v-model="password"
                minlength="10" maxlength="64" required>
            <span class=" block text-sm pt-1 text-violet-300"><router-link to="/reset-password">Forgot password?</router-link></span>
        </div>
        <div>
            <span v-if="error" class=" text-red-600 font-bold mt-2 block">{{ error }}</span>
        </div>
        <div>
            <button class=" rounded-md bg-gray-300 text-black w-24 h-10 mt-5 mb-5">Log in</button>
        </div>
    </form>
</template>

<script>
import router from '@/router';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            username: '',
            password: '',
            error: '',
            username_or_email_error: false,
            isLoading: false,
        }
    },
    methods: {
        ...mapActions(['loginUser']),
        async submitForm() {
            try {
                this.error = ''
                this.isLoading = true
                this.username_error = false
                this.email_error = false
                this.password_error = false
                this.$emit('isLoadingChange', this.isLoading)

                const response = await this.loginUser({
                    username: this.username,
                    password: this.password
                })
                if (response['status'] === 'success') {
                    await router.push('/')
                } else {
                    if (response['username_or_email'] == 'invalid') {
                        this.error += 'Invalid username or password!'
                        this.username_or_email_error = true
                    } else {
                        this.error += response['message']
                    }
                    this.isLoading = false
                    this.$emit('isLoadingChange', this.isLoading)
                }
            } catch (error) {
                this.error = 'An error occurred!'
            }
        },
        makeLowercase(event) {
            console
            this.username = event.target.value.toLowerCase();
        },
    }
}
</script>