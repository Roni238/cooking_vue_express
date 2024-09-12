<template>
    <div class="menu-page">
        <div class="menu">
            <h1>В меню {{this.$route.params.category?getPosts[0]?.category:''}}:</h1>     
                <post-list :posts='getPosts'/>
                <loader-vue v-if="getPosts.length==0"/>  
                <observer-block :action="()=>loadMorePosts(this.$route.params.category)"/>
        </div>
    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex' 

export default {
    computed:{
        ...mapGetters({
            getPosts:'postModule/getPosts',
        })
    },
    mounted(){
        this.$store.dispatch('postModule/mountedPost', this.$route.params.category)
        this.$store.dispatch('styleModule/loadStyleCategory', this.$route.params.category)
    },
    // beforeUnmount(){
    //     this.$store.dispatch('styleModule/resetStyle')
    // },
    methods:{
        ...mapActions({
            loadMorePosts: 'postModule/loadMorePosts',
        }),
    },
}
</script>
<style lang="scss" scoped>
    .menu-page{
        background: var(--category-main-color);
        color: var(--category-second-color);

        .menu{
            padding:10px;
            max-width: 1100px;
            margin: auto;
            min-height: calc(100vh - 65px);

            h1{
                padding: 10px;
                margin: 15px 0px;
            }
        }
    }
    
    
</style>