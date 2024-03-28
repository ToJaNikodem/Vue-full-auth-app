<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class="text-4xl block mt-5 mb-5">Set new password</h1>
            <span v-show="!isLoading">
                <form @submit.prevent="submitForm">
                    <CustomInput label="New password" type="new_password" dataType="password" :form-data="formData"
                        :errors="errors">
                    </CustomInput>
                    <CustomInput label="Confirm new password" type="re_new_password" dataType="password" :form-data="formData"
                        :errors="errors">
                    </CustomInput>
                    <div>
                        <span v-if="errorMessages" class=" text-red-600 font-bold mt-2 block">{{ errorMessages }}</span>
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
import CustomInput from '@/components/CustomInput.vue'

export default {
    name: 'PasswordResetView',
    data() {
        return {
            errorMessages: '',
            errors: false,
            isLoading: false,
            formData: new FormData(),
        }
    },
    components: {
        LoadingCircle,
        CustomInput,
    },
    methods: {
        async submitForm() {
            try {
                const { uid, token } = this.$route.params

                this.errorMessages = ''
                this.errors = false
                this.isLoading = true

                const myFormData = new FormData()

                this.formData.forEach((value, key) => {
                    myFormData.append(key, value)
                })

                if (myFormData.get('new_password') === myFormData.get('re_new_password')) {
                    await axios.post('/password_reset', {
                        user_id: uid,
                        token: token,
                        new_password: myFormData.get('new_password'),
                    })
                    await router.push('/login')
                } else {
                    throw error //TODO
                }
            } catch (error) {
                this.isLoading = false
                this.errorMessages = "An error occurred!"
            }
        }
    }
}
</script>