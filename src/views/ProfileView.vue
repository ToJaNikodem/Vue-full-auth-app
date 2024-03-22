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
    methods: {
        resendVerificationEmail() {
            try {
                const response = axios.post('/resend_verification_email', {
                    username: this.username,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + this.accessToken
                    }
                })
            } catch (error) {
                console.error('Verification email not send: ' + error)
            }
        }
    }
}
</script>