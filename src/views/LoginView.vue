<template>
    <div>
        <h3>Log in</h3>
        <LoginForm></LoginForm>
        <router-link to="/signup">Click here</router-link>
        to sign up!
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