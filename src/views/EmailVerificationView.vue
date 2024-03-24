<template>
    <p>
        {{ text }}
    </p>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            text: "Verifying email...",
        }
    },
    mounted() {
        const { uid, token } = this.$route.params;

        if (uid && token) {
            axios
                .post("/email_verification", {
                    user_id: uid,
                    token: token,
                })
                .then((response) => {
                    this.$store.commit('verifyEmail')
                    this.text = "Email verified, you can close this page!"
                })
                .catch((error) => {
                    if (
                        error.response &&
                        (error.response.status === 400 || error.response.status === 404)
                    ) {
                        this.text = "Invalid link!"
                    } else {
                        this.text = "An error occurred!"
                    }
                })
        }
    },
}
</script>

<style scoped></style>
