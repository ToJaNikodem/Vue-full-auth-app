<template>
    <form @submit.prevent="submitForm">
        <UsernameEmailInput name="username" label="Username" type="username" :form-data="formData"
            :errors="username_error"></UsernameEmailInput>
        <UsernameEmailInput name="email" label="Email" type="email" :form-data="formData" :errors="email_error">
        </UsernameEmailInput>
        <PasswordInput name="password" label="Password" type="signup" :form-data="formData" :errors="password_error">
        </PasswordInput>
        <PasswordInput name="re_password" label="Confirm password" type="none" :form-data="formData"
            :errors="password_error"></PasswordInput>

        <div>
            <span v-if="errorMessage" class=" text-red-600 font-bold mt-2 inline-block">{{ errorMessage }}</span>
        </div>
        <div>
            <button class="rounded-md bg-gray-300 text-black w-24 h-10 mt-5 mb-5">Sign up</button>
        </div>
        <p>
            <router-link to="/login" class=" underline">Click here to log in!</router-link>
        </p>
    </form>
</template>

<script>
import { mapActions } from 'vuex'
import router from '@/router'
import UsernameEmailInput from '@/components/inputs/UsernameEmailInput.vue'
import PasswordInput from '@/components/inputs/PasswordInput.vue'

export default {
    data() {
        return {
            errorMessage: '',
            username_error: false,
            email_error: false,
            password_error: false,
            isLoading: false,
            formData: new FormData()
        }
    },
    components: {
        UsernameEmailInput,
        PasswordInput,
    },
    methods: {
        ...mapActions(['signupUser']),
        async submitForm() {
            try {
                this.errorMessage = ''
                this.isLoading = true
                this.username_error = false
                this.email_error = false
                this.password_error = false
                this.$emit('isLoadingChange', this.isLoading)

                const myFormData = new FormData()

                this.formData.forEach((value, key) => {
                    myFormData.append(key, value)
                })

                const response = await this.signupUser({
                    username: myFormData.get('username'),
                    email: myFormData.get('email'),
                    password: myFormData.get('password'),
                    re_password: myFormData.get('re_password'),
                })
                if (response['status'] == 'success') {
                    await router.push({ name: 'login', query: { loginSuccess: true } })
                } else {
                    this.errorMessage = this.handleErrorMessages(response['errors'])
                    this.isLoading = false
                    this.$emit('isLoadingChange', this.isLoading)
                }
            } catch (error) {
                this.errorMessage = "An error occurred!"
            }
        },
        handleErrorMessages(errors) {
            let messages = ''
            if (errors['userName']) {
                this.username_error = true
                messages += errors['userName']
            }
            if (errors['email']) {
                this.email_error = true
                messages += errors['email']
            }
            if (errors['password']) {
                this.password_error = true
                messages += errors['password']
            }
            if (messages === '') {
                messages = "An error occured!"
            }
            return messages
        }
    }
}
</script>
