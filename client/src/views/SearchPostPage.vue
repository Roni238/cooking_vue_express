<template>
    <div class="menu">
        <h1>Вы искали:</h1>
        <post-list :posts='getSearchedPosts'></post-list>
    </div>
</template>
<script>
import {mapGetters} from 'vuex' 

export default {
    computed:{
        ...mapGetters({
            getCurrentStyle:'styleModule/getCurrentStyle',
            getSearchedPosts:'postModule/getSearchedPosts',
        })
    },
    mounted(){
        if(this.$route.query.searchParams){
            this.$store.commit('postModule/setSearchPostQuery', this.$route.query.searchParams)
        }
        this.$store.dispatch('postModule/findPost', this.$router)
        this.$store.commit('styleModule/setDefaultStyle')
    }
}
</script>
<style lang="scss" scoped>
.menu{
    padding:10px;
    max-width: 1200px;
    margin: auto;
    min-height: calc(100vh - 65px); 
}
h1{
    padding: 10px;
}
</style>