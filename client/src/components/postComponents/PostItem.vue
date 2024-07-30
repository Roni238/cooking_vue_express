<template>
    <article>
        <span @click="this.$store.commit('setSelectObj',post)">
            
            <delete-button v-if="getUser.isActivated&&getUser.role=='admin'"  
                @click="this.$store.commit('setSelectedAction','postModule/removePost')"/>
            <favorites-button :post="post" v-if="getUser.email&&getUser.isActivated"/>
        </span>
        
        <router-link :to="{ name:'recipe', params:{link:post.link} }" :style="{color:getCurrentStyle.secondСolor}">
            <img :src="filePath">
            <h3>{{post.title}}</h3> 
       </router-link>
    </article>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    name:'post-item',
    props:{
        post:{
            type:Object,
            required:true
        }
    },
    computed:{
      ...mapGetters({
            getCurrentStyle:'styleModule/getCurrentStyle',
            getFavoritesId:'favoritesModule/getFavoritesId',
            getUser:'userModule/getUser',
        }),
    },
    data() {
        return {
            filePath:process.env.VUE_APP_API_URL + this.post.fileName
        }
    },
}
</script>
<style lang="scss" scoped>
    article{
        margin: auto;
        text-align: center;
        background-color: rgba(0,0,0, .1);
        border-radius: 12px;
        padding: 10px 20px 5px 20px;
        width: 350px;
        height: 350px;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 11;
        -webkit-box-orient: vertical;
        position: relative;
        display: flex;
        justify-content: center;
    }
    @media (max-width: 370px) {
        article{
            margin: auto;
            width: 100%;
            min-height: 350px;
            height: calc(100vw - 20px);
        }
    }
    @media (max-width: 750px) {
        article{
            margin: auto;
        }
    }
    img{
        width: 260px;
        height: 260px;
        transition: .4s;
        margin-bottom: 10px;
        filter: drop-shadow(0px 5px 5px #222);
        &:hover{
            transform: scale(1.1);
        }
    }
    span{
        position: absolute;
        right: 5px;
        gap: 3px;
        z-index: 10;
        display: flex;
    }   
</style>