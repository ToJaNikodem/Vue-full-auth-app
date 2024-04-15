<template>
    <div>
        <label class="mt-5 inline-block">Two factor authentication code</label><br>
        <span>
            <input name="code" :class="{
                'border-red-600 border-4': errors
            }" class="rounded-md h-10 w-32 text-black text-center mt-2 px-2" type="number" @input="onInput" v-model="code" maxlength="6"
                minlength="6" required>
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
        }
    },
    data() {
        return {
            code: '',
        }
    },
    methods: {
        onInput() {
            this.updateValue()
        },
        updateValue() {
            this.formData.set('code', this.code)
            this.$emit('code')
        },
        maxLength() {
            
        }
    }
}
</script>