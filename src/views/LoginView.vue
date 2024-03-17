<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class=" text-4xl block mt-5 mb-5">Log in</h1>
            <span v-show="!isLoading">
                <LoginForm @isLoadingChange="handleLoadingChange"></LoginForm>
                <p>
                    <router-link to="/signup" class=" underline">Click here to sign up!</router-link>
                </p>
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
    }

}
</script>