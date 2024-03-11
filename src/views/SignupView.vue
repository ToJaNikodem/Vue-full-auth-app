<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class=" text-4xl block mt-5 mb-5">Sign up</h1>
            <SignupForm></SignupForm>
            <p>
                <router-link to="/login" class=" underline">Click here to log in!</router-link> 
            </p>
        </div>
    </div>
</template>

<script>
import SignupForm from "@/components/SignupForm.vue";

export default {
    name: 'SignupView',
    components: {
        SignupForm,
    }
}
</script>