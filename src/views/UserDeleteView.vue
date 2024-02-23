<!--suppress ALL -->
<template>
    <h3>Delete account</h3>
    <form @submit.prevent="submitForm">
        <div>
            <label>Password</label>
            <input type="password" name="password" v-model="password" minlength="12" maxlength="64" required>
        </div>
        <div>
            <button>Delete</button>
        </div>
    </form>
</template>

<script>
import {mapActions} from "vuex";
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
                await this.userDelete({password: this.password})
            } catch (error) {
                console.error('Account deletion failed:', error);
            }
        }
    }
}
</script>

<style scoped>

</style>