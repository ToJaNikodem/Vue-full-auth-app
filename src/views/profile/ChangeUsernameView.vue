<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class="text-4xl block mt-5 mb-5">Change username</h1>
            <span v-show="!isLoading">
                <form @submit.prevent="submitForm">
                    <CustomInput label="New username" type="username" dataType="username" :form-data="formData"
                        :errors="errors">
                    </CustomInput>
                    <div>
                        <span v-if="errorMessage" class=" text-red-600 font-bold mt-2 block">{{ errors }}</span>
                    </div>
                    <div>
                        <button class="rounded-md bg-gray-300 text-black w-48 h-10 mt-5 mb-5">Change username</button>
                    </div>

                </form>
            </span>
            <span v-show="isLoading">
                <div class=" flex flex-col w-full justify-center items-center">
                    <LoadingCircle class=" mt-7"></LoadingCircle>
                    <div class=" mt-3">Changing username...</div>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import LoadingCircle from '@/components/LoadingCircle.vue'
import { mapActions } from 'vuex'
import router from '@/router'
import CustomInput from '@/components/CustomInput.vue'

export default {
    name: 'ChangeUsernameView',
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
        CustomInput,
    },
    methods: {
        ...mapActions(['changeUsername']),
        async submitForm() {
            try {
                this.errorMessage = ''
                this.username_error = false
                this.isLoading = true

                const myFormData = new FormData()

                this.formData.forEach((value, key) => {
                    myFormData.append(key, value)
                })

                const response = await this.changeUsername({ new_nickname: myFormData.get('username') })
                if (response['status'] == 'success') {
                    await router.push('profile')
                } else {
                    this.isLoading = false
                }

            } catch (error) {
                this.errorMessage = "An error occurred!"
            }
        }
    }
}
</script>