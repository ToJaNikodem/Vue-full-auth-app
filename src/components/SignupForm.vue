<template>
    <form @submit.prevent="submitForm">
        <div>
            <label>Username</label><br>
            <input v-on:input="makeLowercase" :class="{ 'border-red-600 border-4': username_error }"
                class=" rounded-md h-10 w-96 mb-5 text-black px-2" type="text" name="username" v-model="username"
                minlength="4" maxlength="40" required>
        </div>
        <div>
            <label>E-mail</label><br>
            <input :class="{ 'border-red-600 border-4': email_error }" class=" rounded-md h-10 w-96 mb-5 text-black px-2"
                type="email" name="email" v-model="email" minlength="4" maxlength="254" required>
        </div>
        <div>
            <label>Password</label><br>
            <input :class="{ 'border-red-600 border-4': password_error }"
                class=" rounded-md h-10 w-96 mb-5 text-black px-2" type="password" name="password" v-model="password"
                minlength="10" maxlength="64" required>
        </div>
        <div>
            <label>Confirm password</label><br>
            <input :class="{ 'border-red-600 border-4': password_error }" class="rounded-md h-10 w-96 text-black px-2"
                type="password" name="re_password" v-model="re_password" minlength="10" maxlength="64" required>
        </div>
        <div>
            <span v-if="error" class=" text-red-600 font-bold mt-2 block">{{ error }}</span>
        </div>
        <div>
            <button class="rounded-md bg-gray-300 text-black w-24 h-10 mt-5 mb-5">Sign up</button>
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex'
import router from '@/router'

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            re_password: '',
            error: '',
            username_error: false,
            email_error: false,
            password_error: false,
            isLoading: false,
        }
    },
    methods: {
        ...mapActions(['signupUser']),
        async submitForm() {
            try {
                this.error = ''
                this.isLoading = true
                this.username_error = false
                this.email_error = false
                this.password_error = false
                this.$emit('isLoadingChange', this.isLoading)

                const response = await this.signupUser({
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    re_password: this.re_password,
                })
                if (response['status'] == 'success') {
                    await router.push('login')
                } else {
                    if (response['username']) {
                        if (response['username'] == 'not_unique') {
                            this.error += 'Username already taken!\n'
                        } else if (response['username'] == 'too_short') {
                            this.error += 'Username to short!\n'
                        } else if (response['username'] == 'invalid') {
                            this.error += 'Invalid username!\n'
                        }
                        this.username_error = true
                    }
                    if (response['email']) {
                        if (response['email'] == 'not_unique') {
                            this.error += 'Email already taken!\n'
                        } else if (response['email'] == 'invalid') {
                            this.error += 'Invalid email!\n'
                        }
                        this.email_error = true
                    }
                    if (response['password']) {
                        if (response['password'] == 'too_short') {
                            this.error += 'Password too short!\n'
                        } else if (response['password'] == 'no_digit') {
                            this.error += 'Password must include a digit!\n'
                        } else if (response['password'] == 'no_special') {
                            this.error += 'Password must include an special character!\n'
                        } else if (response['password'] == 'no_match') {
                            this.error += 'Password do not match!\n'
                        }
                        this.password_error = true
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
