<template>
    <div> Welcome {{ nickname }}!</div>
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
