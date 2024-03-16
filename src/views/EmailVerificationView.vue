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
            text: 'Verifying email...'
        };
    },
    mounted() {
        const { uid, token } = this.$route.params;

        if (uid && token) {
            try {
                const response = axios.post('/email_verification', {
                    user_id: uid,
                    token: token,
                });
                if (response) {
                    this.text = 'Email verified, you can close this page! '
                    console.log(response)
                }
            } catch (error) {
                this.text = 'Invalid link!'
                console.error(error)
            }
        }
    }
}
</script>

<style scoped></style>