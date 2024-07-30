<template>
    <div>
        <comment-item v-for="comment in getComments" :comment="comment" :key="comment.id"/>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    name:'comment-list',
    computed:{
      ...mapGetters({
            getComments:'commentModule/getComments'
        }) 
    },
}
</script>