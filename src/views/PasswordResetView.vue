<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class="text-4xl block mt-5 mb-5">Set new password</h1>
            <span v-show="!isLoading">
                <form @submit.prevent="submitForm">
                    <div>
                        <label>Password</label><br>
                        <input :class="{ 'border-red-600 border-4': password_error }"
                            class="rounded-md h-10 w-96 mb-5 text-black px-2" type="password" name="password"
                            v-model="password" minlength="4" maxlength="254" required>
                    </div>
                    <div>
                        <label>Confirm password</label><br>
                        <input :class="{ 'border-red-600 border-4': password_error }"
                            class="rounded-md h-10 w-96 mb-5 text-black px-2" type="password" name="re-password"
                            v-model="re_password" minlength="4" maxlength="254" required>
                    </div>
                    <div>
                        <span v-if="error" class=" text-red-600 font-bold mt-2 block">{{ error }}</span>
                    </div>
                    <div>
                        <button class="rounded-md bg-gray-300 text-black w-64 h-10 mt-5 mb-5">Set new password</button>
                    </div>

                </form>
            </span>
            <span v-show="isLoading">
                <div class=" flex flex-col w-full justify-center items-center">
                    <LoadingCircle class=" mt-7"></LoadingCircle>
                    <div class=" mt-3">Setting new password...</div>
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
    name: 'PasswordResetView',
    data() {
        return {
            password: '',
            re_password: '',
            error: '',
            password_error: false,
            isLoading: false,
        }
    },
    components: {
        LoadingCircle,
    },
    methods: {
        async submitForm() {
            try {
                const { uid, token } = this.$route.params

                this.error = ''
                this.password_error = false
                this.isLoading = true
                if (this.password === this.re_password) {
                    const response = await axios.post('/password_reset', {
                        user_id: uid,
                        token: token,
                        new_password: this.password,
                    })
                    await router.push('/login')
                } else {
                    throw error
                }
            } catch (error) {
                this.isLoading = false
                this.error = 'An error occurred!'
            }
        }
    }
}
</script>