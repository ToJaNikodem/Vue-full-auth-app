<template>
    <p>
        {{ text }}
    </p>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            text: "Verifying email...",
        }
    },
    mounted() {
        const { userId, token } = this.$route.params
        if (userId && token) {
            this.verifyEmail(userId, token)
        }
    },
    methods: {
        async verifyEmail(userId, token) {
            try {
                await axios.post('/user/email-verification', {
                    encodedUserId: userId,
                    verificationToken: token,
                })
                this.$store.commit('verifyEmail')
                this.text = "Email verified, you can close this page!"
            } catch (error) {
                if (
                    error.response &&
                    (error.response.status === 400 || error.response.status === 404)
                ) {
                    this.text = "Invalid link!"
                } else {
                    this.text = "An error occurred!"
                }
            }
        }
    }
}
</script>
