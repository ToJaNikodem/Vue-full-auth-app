<template>
    <div>
        <h1>Sign up</h1>
        <SignupForm></SignupForm>
        <router-link to="/login">Click here</router-link> to log in!
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