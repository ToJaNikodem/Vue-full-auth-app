<template>
    <div class=" m-6 text-5xl"> Welcome <span v-if="nickname != ''"> {{ nickname }}</span><span v-else> {{ username }}</span>!</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'HomeView',
    computed: {
        ...mapGetters(['nickname', 'username'])
    },
}
</script>
