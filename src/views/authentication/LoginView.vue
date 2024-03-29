<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class=" text-4xl block mt-5 mb-5">Log in</h1>
            <div v-if="messages" class=" bg-green-500 w-64 m-auto p-2 rounded-md" >
                {{ messages }}
            </div>
            <span v-show="!isLoading">
                <LoginForm @isLoadingChange="handleLoadingChange"></LoginForm>
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
import LoginForm from "@/components/LoginForm.vue"
import LoadingCircle from '@/components/LoadingCircle.vue'

export default {
    data() {
        return {
            isLoading: false,
            messages: '',
        }
    },
    name: 'LoginView',
    components: {
        LoginForm,
        LoadingCircle,
    },
    methods: {
        handleLoadingChange(isLoading) {
            this.isLoading = isLoading;
        }
    },
    mounted() {
        if (this.$route.query.loginSuccess) {
            this.messages = 'Account created successfully!'
        }
    }
}
</script>