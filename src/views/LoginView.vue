<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class=" text-4xl block mt-5 mb-5">Log in</h1>
            <LoginForm></LoginForm>
            <p>
                <router-link to="/signup" class=" underline">Click here to sign up!</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
    name: 'LoginView',
    components: {
        LoginForm,

    }
}
</script>