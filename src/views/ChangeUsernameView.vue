<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class="text-4xl block mt-5 mb-5">Change username</h1>
            <span v-show="!isLoading">
                <form @submit.prevent="submitForm">
                    <div>
                        <label>New username</label><br>
                        <input :class="{ 'border-red-600 border-4': username_error }"
                            class="rounded-md h-10 w-96 mb-5 text-black px-2" type="text" name="new-username"
                            v-model="new_username" minlength="4" maxlength="40" required>
                    </div>
                    <div>
                        <span v-if="error" class=" text-red-600 font-bold mt-2 block">{{ error }}</span>
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

export default {
    name: 'ChangeUsernameView',
    data() {
        return {
            new_username: '',
            error: '',
            username_error: false,
            isLoading: false,
        }
    },
    components: {
        LoadingCircle,
    },
    methods: {
        ...mapActions(['changeUsername']),
        async submitForm() {
            try {
                this.error = ''
                this.username_error = false
                this.isLoading = true

                const response = await this.changeUsername({ new_username: this.new_username })
                if (response['status'] == 'success') {
                    await router.push('profile')
                } else {
                    console.error('prp')
                    this.isLoading = false
                }
                
            } catch (error) {
                this.error = 'An error occurred!'
            }
        }
    }
}
</script>