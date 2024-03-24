<template>
    <div class=" m-6 text-5xl"> Welcome {{ nickname }}!</div>
    <LoadingCircle></LoadingCircle>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'HomeView',
    computed: {
        ...mapGetters(['nickname'])
    },
}
</script>
