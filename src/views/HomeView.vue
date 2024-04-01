<template>
    <div class=" m-6 text-5xl"> Welcome {{ username }}!</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'HomeView',
    computed: {
        ...mapGetters(['username'])
    },
}
</script>
