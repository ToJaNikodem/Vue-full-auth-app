<template>
    <p>
        {{ text }}
    </p>
</template>

<script>
import axios from 'axios'


async function verifyEmail(uid, token) {
    try {
        await axios.post('/email_verification', {
            user_id: uid,
            token: token,
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

export default {
    data() {
        return {
            text: "Verifying email...",
        }
    },
    mounted() {
        const { uid, token } = this.$route.params
        if (uid && token) {
            verifyEmail(uid, token)
        }
    },
}
</script>
