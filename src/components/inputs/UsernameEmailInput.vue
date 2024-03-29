<template>
    <div>
        <label class="mt-5 inline-block">{{ label }}</label><br>
        <span>
            <input :name="name" :class="{
                'border-red-600 border-4': errors
            }" class="rounded-md h-10 w-96 text-black px-2" :type="inputType" v-model="username" :maxlength="maxLength"
                minlength="4" @input="onInput" required>
        </span>
    </div>
</template>

<script>
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
        type: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            username: '',
        }
    },
    methods: {
        onInput(event) {
            this.updateValue()
            this.makeLowercase(event)
        },
        updateValue() {
            this.formData.set(this.name, this.username)
            this.$emit('username')
        },
        makeLowercase(event) {
            this.username = event.target.value.toLowerCase()
        },
    },
    computed: {
        maxLength() {
            if (this.type === 'username') {
                return 40
            } else if (this.type === 'email' || this.type === 'username_or_email') {
                return 254
            } 
        },
        inputType() {
            if (this.type === 'email') {
                return 'email'
            } else {
                return 'text'
            }
        }
    }
}
</script>