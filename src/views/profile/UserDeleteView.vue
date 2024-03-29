<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class="text-4xl block mt-5 mb-5">Delete account</h1>
            <span v-show="!isLoading">
                <form @submit.prevent="submitForm">
                    <PasswordInput name="password" label="Password" type="none" :form-data="formData" :errors="errors"></PasswordInput>
                    <div>
                        <span v-if="errorMessages" class=" text-red-600 font-bold mt-2 block">{{ errorMessages }}</span>
                    </div>
                    <div>
                        <button class="rounded-md bg-gray-300 text-black w-24 h-10 mt-5 mb-5">Delete</button>
                    </div>

                </form>
            </span>
            <span v-show="isLoading">
                <div class=" flex flex-col w-full justify-center items-center">
                    <LoadingCircle class=" mt-7"></LoadingCircle>
                    <div class=" mt-3">Deleting account...</div>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import LoadingCircle from '@/components/LoadingCircle.vue'
import PasswordInput from '@/components/inputs/PasswordInput.vue'

export default {
    name: 'UserDeleteView',
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
        PasswordInput,
    },
    methods: {
        ...mapActions(['deleteUser', 'logoutUser']),
        async submitForm() {
            try {
                this.errorMessages = ''
                this.errors = false
                this.isLoading = true

                const myFormData = new FormData()

                this.formData.forEach((value, key) => {
                    myFormData.append(key, value)
                })

                const response = await this.deleteUser({ password: myFormData.get('password') })

                if (response['status'] === 'success') {
                    await this.logoutUser()
                } else {
                    this.errors = true
                    if (response['password']) {
                        this.errorMessages = "Invalid password!"
                    } else {
                        this.errorMessages = response['message']
                    }
                    this.isLoading = false
                }
            } catch (error) {
                this.errorMessages = "An error occurred!"
            }
        }
    }
}
</script>
