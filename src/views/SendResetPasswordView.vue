<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class="text-4xl block mt-5 mb-5">Reset password</h1>
            <span v-show="!isLoading">
                <form @submit.prevent="submitForm">
                    <div>
                        <label>Email</label><br>
                        <input :class="{ 'border-red-600 border-4': email_error }"
                            class="rounded-md h-10 w-96 mb-5 text-black px-2" type="email" name="password"
                            v-model="email" minlength="4" maxlength="254" required>
                    </div>
                    <div>
                        <span v-if="error" class=" text-red-600 font-bold mt-2 block">{{ error }}</span>
                    </div>
                    <div>
                        <button class="rounded-md bg-gray-300 text-black w-64 h-10 mt-5 mb-5">Send password reset email</button>
                    </div>

                </form>
            </span>
            <span v-show="isLoading">
                <div class=" flex flex-col w-full justify-center items-center">
                    <LoadingCircle class=" mt-7"></LoadingCircle>
                    <div class=" mt-3">Reseting password...</div>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import LoadingCircle from '@/components/LoadingCircle.vue'
import axios from 'axios'
import router from '@/router'

export default {
    name: 'ResetPasswordView',
    data() {
        return {
            email: '',
            error: '',
            email_error: false,
            isLoading: false,
        }
    },
    components: {
        LoadingCircle,
    },
    methods: {
        async submitForm() {
            try {
                this.error = ''
                this.email_error = false
                this.isLoading = true
                const response = await axios.post('/send_password_reset_email', {
                    email: this.email,
                })
                router.push('login')
            } catch (error) {
                this.isLoading = false
                this.error = 'An error occurred!'
            }
        }
    }
}
</script>