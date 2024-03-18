<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class=" text-4xl block mt-5 mb-5">Sign up</h1>
            <span v-show="!isLoading">
                <SignupForm @isLoadingChange="handleLoadingChange"></SignupForm>
                <p>
                    <router-link to="/login" class=" underline">Click here to log in!</router-link>
                </p>
            </span>
            <span v-show="isLoading">
                <div class=" flex flex-col w-full justify-center items-center">
                    <LoadingCircle class=" mt-7"></LoadingCircle>
                    <div class=" mt-3">Signing up...</div>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import SignupForm from '@/components/SignupForm.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'

export default {
    data() {
        return {
            isLoading: false,
        }
    },
    name: 'SignupView',
    components: {
        SignupForm,
        LoadingCircle,
    },
    methods: {
        handleLoadingChange(isLoading) {
            this.isLoading = isLoading;
        },
    }
}
</script>