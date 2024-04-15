<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class="text-4xl block mt-5 mb-5">Change password</h1>
            <span v-show="!isLoading">
                <form @submit.prevent="submitForm">
                    <PasswordInput name="old_password" label="Old password" type="none" :form-data="formData"
                        :errors="old_password_error"></PasswordInput>
                    <PasswordInput name="new_password" label="New password" type="none" :form-data="formData"
                        :errors="new_password_error"></PasswordInput>
                    <PasswordInput name="re_new_password" label="Confirm new password" type="none" :form-data="formData"
                        :errors="new_password_error"></PasswordInput>
                    <div>
                        <span v-if="errorMessage" class=" text-red-600 font-bold mt-2 block">{{ errorMessage }}</span>
                    </div>
                    <div>
                        <button class="rounded-md bg-gray-300 text-black w-48 h-10 mt-5 mb-5">Change password</button>
                    </div>

                </form>
            </span>
            <span v-show="isLoading">
                <div class=" flex flex-col w-full justify-center items-center">
                    <LoadingCircle class=" mt-7"></LoadingCircle>
                    <div class=" mt-3">Changing password...</div>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import LoadingCircle from '@/components/LoadingCircle.vue'
import { mapActions } from 'vuex'
import router from '@/router'
import PasswordInput from '@/components/inputs/PasswordInput.vue'

export default {
    name: 'ChangePasswordView',
    data() {
        return {
            errorMessage: '',
            old_password_error: false,
            new_password_error: false,
            isLoading: false,
            formData: new FormData(),
        }
    },
    components: {
        LoadingCircle,
        PasswordInput,
    },
    methods: {
        ...mapActions(['changePassword']),
        async submitForm() {
            try {
                this.errorMessage = ''
                this.old_password_error = false
                this.new_password_error = false
                this.isLoading = true

                const myFormData = new FormData()

                this.formData.forEach((value, key) => {
                    myFormData.append(key, value)
                })

                if (myFormData.get('new_password') === myFormData.get('re_new_password')) {
                    const response = await this.changePassword({ old_password: myFormData.get('old_password'), new_password: myFormData.get('new_password') })
                    if (response['status'] == 'success') {
                        await router.push({ name: 'profile', query: { passwordChangeSuccess: true } })
                    } else {
                        this.isLoading = false
                        this.new_password_error = true
                        if (response['errors']['newPassword']) {
                            this.errorMessage = response['errors']['newPassword'][0]
                        } else {
                            this.errorMessage = "An error occurred!"
                        }
                    }
                } else {
                    this.isLoading = false
                    this.new_password_error = true
                    this.errorMessage = "Passwords do not match!"
                }

            } catch (error) {
                this.errorMessage = "An error occurred!"
            }
        }
    }
}
</script>