<!--suppress ALL -->
<template>
    <form @submit.prevent="submitForm">
        <div>
            <label>Username</label><br>
            <input class=" rounded-md h-10 w-96 mb-5 text-black px-2" type="text" name="username" v-model="username" minlength="4" maxlength="40" required>
        </div>
        <div>
            <label>E-mail</label><br>
            <input class=" rounded-md h-10 w-96 mb-5 text-black px-2" type="email" name="email" v-model="email" minlength="4" maxlength="254" required>
        </div>
        <div>
            <label>Password</label><br>
            <input class=" rounded-md h-10 w-96 mb-5 text-black px-2" type="password" name="password" v-model="password" minlength="10" maxlength="64" required>
        </div>
        <div>
            <label>Confirm password</label><br>
            <input class="rounded-md h-10 w-96 text-black px-2" type="password" name="re_password" v-model="re_password" minlength="10" maxlength="64" required>
        </div>
        <div>
            <span v-if="error">{{ error }}</span>
        </div>
        <div>
            <button class="rounded-md bg-gray-300 text-black w-24 h-10 mt-5 mb-5">Sign up</button>
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
            isLoading: false,
        }
    },
    methods: {
        ...mapActions(['signupUser']),
        async submitForm() {
            try {
                this.isLoading = true
                this.$emit('isLoadingChange', this.isLoading)

                const response = await this.signupUser({
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    re_password: this.re_password,
                })
                console.log(response)
                if (response['status'] === 'success') {
                    await router.push('/login')
                } else {
                    if (response['username']) {
                        this.error += response['username']
                    }
                    if (response['email']) {
                        this.error += response['email']
                    }
                    if (response['password']) {
                        this.error += response['password']
                    }
                    this.isLoading = false 
                    this.$emit('isLoadingChange', this.isLoading)
                }
            } catch (error) {
                this.error = 'An error occurred!'
            }
        }
    }
}
</script>

