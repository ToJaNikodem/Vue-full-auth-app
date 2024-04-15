<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <span v-show="!isLoading">
                <form @submit.prevent="submitForm">
                    <TwoFactorAuthenticationCodeInput :form-data="formData" :errors="errors">
                    </TwoFactorAuthenticationCodeInput>
                    <div>
                        <span v-if="errorMessage" class=" text-red-600 font-bold mt-2 block">{{ errorMessage }}</span>
                    </div>
                    <div>
                        <button class=" rounded-md bg-gray-300 text-black w-24 h-10 mt-5 mb-5">Verify</button>
                    </div>
                </form>
            </span>
            <span v-show="isLoading">
                <div class=" flex flex-col w-full justify-center items-center">
                    <LoadingCircle class=" mt-7"></LoadingCircle>
                    <div class=" mt-3">Logging in...</div>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import TwoFactorAuthenticationCodeInput from '@/components/inputs/TwoFactorAuthenticationCodeInput.vue';
import LoadingCircle from '@/components/LoadingCircle.vue'
import router from '@/router';

export default {
    data() {
        return {
            errorMessage: '',
            errors: false,
            isLoading: false,
            formData: new FormData(),
        }
    },
    components: {
        TwoFactorAuthenticationCodeInput,
        LoadingCircle
    },
    methods: {
        ...mapActions(['loginUser2Fa']),
        async submitForm() {
            try {
                this.errorMessage = ''
                this.errors = false
                this.isLoading = true

                const { uid, loginToken }  = this.$route.params

                const myFormData = new FormData()

                this.formData.forEach((value, key) => {
                    myFormData.append(key, value)
                })

                const response = await this.loginUser2Fa({
                    uid: uid,
                    loginToken: loginToken,
                    code: myFormData.get('code') 
                })

                if (response['status'] == 'success') {
                    router.push('/')
                } else {
                    this.errorMessage += "Invalid code!"
                    this.errors = true
                    this.isLoading = false
                }

            } catch (error) {
                this.errorMessage += "An error occured!"
                this.errors = true
                this.isLoading = false
            }
        }
    }
}
</script>