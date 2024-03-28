<template>
    <form @submit.prevent="submitForm">
        <CustomInput label="Username" type="username" dataType="username" :form-data="formData" :errors="username_error">
        </CustomInput>

        <CustomInput label="Email" type="email" dataType="email" :form-data="formData" :errors="email_error">
        </CustomInput>

        <CustomInput label="Password" type="signup_password" dataType="password" :form-data="formData" :errors="password_error">
        </CustomInput>

        <CustomInput label="Confirm password" type="re_password" dataType="password" :form-data="formData" :errors="password_error">
        </CustomInput>

        <div>
            <span v-if="errorMessages" class=" text-red-600 font-bold mt-2 block">{{ errorMessages }}</span>
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
import CustomInput from './CustomInput.vue'

export default {
    data() {
        return {
            errorMessages: '',
            username_error: false,
            email_error: false,
            password_error: false,
            isLoading: false,
            formData: new FormData()
        }
    },
    components: {
        CustomInput,
    },
    methods: {
        ...mapActions(['signupUser']),
        async submitForm() {
            try {
                this.errorMessages = ''
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
                    password: myFormData.get('signup_password'),
                    re_password: myFormData.get('re_password'),
                })
                if (response['status'] == 'success') {
                    await router.push('login')
                } else {
                    if (response['username']) {
                        if (response['username'] == 'not_unique') {
                            this.errorMessages += "Username already taken!\n"
                        } else if (response['username'] == 'too_short') {
                            this.errorMessages += "Username to short!\n"
                        } else if (response['username'] == 'invalid') {
                            this.errorMessages += "Invalid username!\n"
                        }
                        this.username_error = true
                    }
                    if (response['email']) {
                        if (response['email'] == 'not_unique') {
                            this.errorMessages += "Email already taken!\n"
                        } else if (response['email'] == 'invalid') {
                            this.errorMessages += "Invalid email!\n"
                        }
                        this.email_error = true
                    }
                    if (response['password']) {
                        if (response['password'] == 'too_short') {
                            this.errorMessages += "Password too short!\n"
                        } else if (response['password'] == 'no_digit') {
                            this.errorMessages += "Password must include a digit!\n"
                        } else if (response['password'] == 'no_special') {
                            this.errorMessages += "Password must include an special character!\n"
                        } else if (response['password'] == 'no_match') {
                            this.errorMessages += "Password do not match!\n"
                        }
                        this.password_error = true
                    }
                    this.isLoading = false
                    this.$emit('isLoadingChange', this.isLoading)
                }
            } catch (error) {
                this.errorMessages = "An error occurred!"
            }
        },
    }
}
</script>
