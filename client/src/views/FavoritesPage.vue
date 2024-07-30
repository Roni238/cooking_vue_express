<template>
    <div class="favorites">

        <h2>Избранные</h2>
        <post-list :posts="getFavoritesPosts" v-if="!loading && userHasFavorites"/>
        <loader-vue v-if="loading"/>
        
        <h3 v-if="!loading && !userHasFavorites" class="nonFavorites">Избранных нет</h3>
        <h3 v-if="error" class="error" @click="loadFavoritesPost()">Отсутствует подключение &#11119; </h3>
      </div>
</template>
<script>
import {mapGetters} from 'vuex' 

export default {
    computed:{
        ...mapGetters({
            getFavoritesPosts:'favoritesModule/getFavoritesPosts'
        }),
    },
    data() {
        return {
            loading: {
                type:Boolean
            },
            userHasFavorites: {
                type:Boolean
            },
            error: {
                type:Boolean
            },
        }
    },
    mounted(){
        this.loadFavoritesPost()
    },
    methods: {
        async loadFavoritesPost(){
            this.loading = true,
            this.userHasFavorites = true,
            this.error = false
            try {
                await this.$store.dispatch('favoritesModule/loadFavorites')
                this.loading = false
                this.userHasFavorites = this.getFavoritesPosts.length > 0
            } catch (error) {
                this.loading = false
                this.error = true
            }
            this.$store.commit('styleModule/setDefaultStyle')
        }
    },
    watch:{
        getFavoritesPosts(posts){
           if(posts.length==0){
            this.userHasFavorites=false
           }
        }
    }
}
</script>
<style lang="scss" scoped>
h3{
    margin-top: 10px;
    width:100%;
    display: flex;
    justify-content: center;
}
h2{
    margin: 15px 0px;
}
.favorites{
    max-width:1100px;
    margin:auto;
    padding: 10px;
}
.error{
    cursor: pointer;
}
</style>