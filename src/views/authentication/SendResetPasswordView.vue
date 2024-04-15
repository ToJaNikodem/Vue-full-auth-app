<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class="text-4xl block mt-5 mb-5">Reset password</h1>
            <span v-show="!isLoading">
                <form @submit.prevent="submitForm">
                    <UsernameEmailInput name="email" label="Email" type="email" :form-data="formData" :errors="errors">
                    </UsernameEmailInput>
                    <div>
                        <span v-if="errorMessage" class=" text-red-600 font-bold mt-2 block">{{ errorMessage }}</span>
                    </div>
                    <div>
                        <button class="rounded-md bg-gray-300 text-black w-64 h-10 mt-5 mb-5">Send password reset
                            email</button>
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
import UsernameEmailInput from '@/components/inputs/UsernameEmailInput.vue'

export default {
    name: 'ResetPasswordView',
    data() {
        return {
            errorMessage: '',
            errors: false,
            isLoading: false,
            formData: new FormData(),
        }
    },
    components: {
        LoadingCircle,
        UsernameEmailInput,
    },
    methods: {
        async submitForm() {
            try {
                this.errorMessage = ''
                this.errors = false
                this.isLoading = true

                const myFormData = new FormData()

                this.formData.forEach((value, key) => {
                    myFormData.append(key, value)
                })

                await axios.post('/user/send-password-reset-email', {
                    email: myFormData.get('email'),
                })

                await router.push({ name: 'login', query: { passwordEmailSuccess: true } })
            } catch (error) {
                this.isLoading = false
                this.errorMessage = "An error occurred!"
            }
        }
    }
}
</script>