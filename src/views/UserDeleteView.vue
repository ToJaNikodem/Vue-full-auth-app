<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class="text-4xl block mt-5 mb-5">Delete account</h1>
            <span v-show="!isLoading">
                <form @submit.prevent="submitForm">
                    <div>
                        <label>Password</label><br>
                        <input :class="{ 'border-red-600 border-4': password_error }"
                            class="rounded-md h-10 w-96 mb-5 text-black px-2" type="password" name="password"
                            v-model="password" minlength="10" maxlength="64" required>
                    </div>
                    <div>
                        <span v-if="error" class=" text-red-600 font-bold mt-2 block">{{ error }}</span>
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
import { mapActions } from 'vuex';
import LoadingCircle from '@/components/LoadingCircle.vue'

export default {
    name: 'UserDeleteView',
    data() {
        return {
            password: '',
            error: '',
            password_error: false,
            isLoading: false,
        }
    },
    components: {
        LoadingCircle,
    },
    methods: {
        ...mapActions(['deleteUser', 'logoutUser']),
        async submitForm() {
            try {
                this.error = ''
                this.password_error = false
                this.isLoading = true
                const response = await this.deleteUser({ password: this.password })

                if (response['status'] === 'success') {
                    await this.logoutUser()
                } else {
                    this.password_error = true
                    if (response['password']){
                        this.error = 'Invalid password!'
                    } else {
                        this.error = response['message']
                    }
                    this.isLoading = false
                }
            } catch (error) {
                this.error = 'An error occurred!'
            }
        }
    }
}
</script>

<style scoped></style>