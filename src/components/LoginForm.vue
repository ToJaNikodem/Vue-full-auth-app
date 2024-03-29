<template>
    <form @submit.prevent="submitForm">
        <UsernameEmailInput name="username" label="Username" type="username" :form-data="formData" :errors="errors"></UsernameEmailInput>
        <PasswordInput name="password" label="Password" type="login" :form-data="formData" :errors="errors"></PasswordInput>
        <div>
            <span v-if="errorMessage" class=" text-red-600 font-bold mt-2 block">{{ errorMessage }}</span>
        </div>
        <div>
            <button class=" rounded-md bg-gray-300 text-black w-24 h-10 mt-5 mb-5">Log in</button>
        </div>
    </form>
    <p>
        <router-link to="/signup" class=" underline">Click here to sign up!</router-link>
    </p>
</template>

<script>
import router from '@/router'
import { mapActions } from 'vuex'
import UsernameEmailInput from '@/components/inputs/UsernameEmailInput.vue'
import PasswordInput from '@/components/inputs/PasswordInput.vue'

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
        PasswordInput,
        UsernameEmailInput,
    },
    methods: {
        ...mapActions(['loginUser']),
        async submitForm() {
            try {
                this.errorMessage = ''
                this.isLoading = true
                this.errors = false
                this.$emit('isLoadingChange', this.isLoading)

                const myFormData = new FormData()

                this.formData.forEach((value, key) => {
                    myFormData.append(key, value)
                })

                const response = await this.loginUser({
                    username: myFormData.get('username'),
                    password: myFormData.get('password'),
                })
                if (response['status'] == 'success') {
                    await router.push('/')
                } else {
                    if (response['username_or_email'] == 'invalid') {
                        this.errorMessage += "Invalid username or password!"
                        this.errors = true
                    } else {
                        this.errorMessage += response['message']
                    }
                    this.isLoading = false
                    this.$emit('isLoadingChange', this.isLoading)
                }
            } catch (error) {
                this.errorMessage = "An error occurred!"
            }
        },
    }
}
</script>