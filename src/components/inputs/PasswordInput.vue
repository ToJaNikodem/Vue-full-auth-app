<template>
    <div>
        <label class="mt-5 inline-block">{{ label }}</label><br>
        <span class=" relative">
            <input :name="name" :class="{
            'border-red-600 border-4': errors
        }" class=" pr-12 rounded-md h-10 w-96 text-black px-2" :type="inputType" v-model="password" maxlength="64"
                minlength="10" @input="onInput" required>
            <img @click="showPassword" :src="require(`@/assets/icons/search.png`)" alt="show password"
                class=" cursor-pointer absolute h-6 w-6 inline top-0 right-3">
        </span>

        <span v-if="type === 'login'" class=" block text-sm pt-1 text-violet-400"><router-link
                to="/reset-password">Forgot
                password?</router-link></span>

        <span v-if="type === 'signup'" class=" block text-sm pt-1" :class="{
            'text-red-500': passwordStrength <= 1, 'text-yellow-500': passwordStrength == 2, 'text-green-500': passwordStrength >= 3
        }">{{
            passwordStrengthText
        }}</span>
    </div>
</template>

<script>
import zxcvbn from 'zxcvbn'

const passwordStrengthDescriptions = {
    0: 'Very weak password',
    1: 'Weak password',
    2: 'Medium strength password',
    3: 'Strong password',
    4: 'Very strong password'
}

export default {
    props: {
        errors: {
            type: Boolean,
            default: false
        },
        formData: {
            type: FormData,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            password: '',
            passwordStrengthText: '',
            showPasswordValue: false,
            passwordstrength: 0
        }
    },
    methods: {
        onInput() {
            this.updateValue()
        },
        updateValue() {
            this.formData.set(this.name, this.password)
            this.$emit('password')
        },
        showPassword() {
            if (this.showPasswordValue) {
                this.showPasswordValue = false
            } else {
                this.showPasswordValue = true
            }
        }
    },
    watch: {
        password(password) {
            const result = zxcvbn(password)
            this.passwordStrength = result.score
            this.passwordStrengthText = passwordStrengthDescriptions[this.passwordStrength] || ''
        }
    },
    computed: {
        inputType() {
            return this.showPasswordValue ? 'text' : 'password'
        }
    }
}
</script>