<template>
    <div>
        <label class="mt-5 inline-block">{{ label }}</label><br>
        <input :name="type" :class="{ 'border-red-600 border-4': errors }"
            class="rounded-md h-10 w-96 text-black px-2" :type="inputType" v-model="inputValue"
            :maxlength="maxLength" :minlength="minLength" @input="updateValue" required>
        <span v-if="type === 'login_password'" class=" block text-sm pt-1 text-violet-300"><router-link
                to="/reset-password">Forgot
                password?</router-link></span>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        errors: {
            type: Boolean,
            default: false
        },
        formData: {
            type: FormData,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        dataType: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            inputValue: ''
        }
    },
    methods: {
        updateValue() {
            this.formData.set(this.type, this.inputValue)
            this.$emit('inputField')
        }
    },
    computed: {
        maxLength() {
            if (this.dataType === 'username') {
                return 40
            } else if (this.dataType === 'username_or_email' || this.dataType === 'email') {
                return 254
            } else if (this.dataType === 'password') {
                return 64
            }
        },
        minLength() {
            if (this.dataType === 'username' || this.dataType === 'username_or_email' || this.dataType === 'email') {
                return 4
            } else if (this.dataType === 'password') {
                return 10
            }
        },
        inputType() {
            if (this.dataType === 'username' || this.dataType === 'username_or_email') {
                return 'text'
            } else if (this.dataType === 'password') {
                return 'password'
            } else if (this.dataType === 'email') {
                return 'email'
            }
        }
    }
}
</script>