<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class=" flex flex-col w-1/2 h-1/2 text-center">
            <h1 class="text-4xl block mt-5 mb-5">Delete account</h1>
            <form @submit.prevent="submitForm">
                <div>
                    <label>Password</label><br>
                    <input class="rounded-md h-10 w-96 mb-5 text-black px-2" type="password" name="password" v-model="password" minlength="10" maxlength="64" required>
                </div>
                <div>
                    <button class="rounded-md bg-gray-300 text-black w-24 h-10 mt-5 mb-5">Delete</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import store from "@/store";

console.log(store.state.user.accessToken)
export default {
    name: 'UserDeleteView',
    data() {
        return {
            password: '',
        }
    },
    methods: {
        ...mapActions(['userDelete']),
        async submitForm() {
            try {
                await this.userDelete({ password: this.password })
            } catch (error) {
                console.error('Account deletion failed:', error);
            }
        }
    }
}
</script>

<style scoped></style>