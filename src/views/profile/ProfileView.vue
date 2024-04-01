<template>
    <div>
        <router-link
            class="text-md ml-5 text-white bg-blue-600 px-2 py-1 mt-5 rounded-md block font-bold w-64 text-center"
            to="/change-username">Change username</router-link>
        <router-link
            class="text-md ml-5 text-white bg-yellow-600 px-2 py-1 mt-5 rounded-md block font-bold w-64 text-center"
            to="/change-password">Change password</router-link>
        <button class="text-md ml-5 text-white bg-green-600 px-2 py-1 mt-5 rounded-md block font-bold w-64 text-center"
            v-if="!isEmailVerified" @click="resendVerificationEmail">Resend
            verification email</button>
        <router-link
            class="text-md ml-5 text-white bg-red-600 px-2 py-1 mt-5 rounded-md block font-bold w-64 text-center"
            to="/delete-user">Delete account</router-link>
        <div v-if="messages" :class="{ 'bg-red-500': isMessageError }"
            class="bg-green-500 w-96 text-center p-2 rounded-md absolute top-10 left-1/2 -translate-x-1/2">
            {{ messages }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    name: 'ProfileView',
    computed: {
        ...mapGetters(['isEmailVerified', 'username', 'accessToken'])
    },
    data() {
        return {
            messages: '',
            isMessageError: false
        }
    },
    methods: {
        async resendVerificationEmail() {
            try {
                await axios.post('/user/resend-verification-email', {
                    userName: this.username,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + this.accessToken
                    }
                })
                this.messages = 'Verification email send!'
                setTimeout(this.resetMessages, 3 * 1000)
            } catch (error) {
                this.messages = 'An error occured when sending email!'
                this.isMessageError = true
                setTimeout(this.resetMessages, 3 * 1000)
            }
        },
        resetMessages() {
            this.messages = ''
            this.isMessageError = false
            this.$router.replace({ query: null })
        }
    },
    mounted() {
        if (this.$route.query.usernameChangeSuccess) {
            this.messages = 'Username changed successfully!'
            setTimeout(this.resetMessages, 3 * 1000)
        } else if (this.$route.query.passwordChangeSuccess) {
            this.messages = 'Password changed successfully!'
            setTimeout(this.resetMessages, 3 * 1000)
        }
    }
}
</script>