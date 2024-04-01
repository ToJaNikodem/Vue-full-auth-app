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
        const { uid, token } = this.$route.params
        if (uid && token) {
            this.verifyEmail(uid, token)
        }
    },
    methods: {
        async verifyEmail(uid, token) {
            try {
                console.log("uid: " + uid)
                console.log("token: " + token)
                await axios.post('/user/email-verification', {
                    encodedUserId: uid,
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
