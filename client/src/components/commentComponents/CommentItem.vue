<template>
    <div>   
        <delete-button v-if="getUser.id == comment.autor.id || getUser.role=='admin'"
          @click="this.$store.commit('setSelectedAction','commentModule/removeComment');this.$store.commit('setSelectObj',comment)"
        />

        <h3>{{comment.autor.name}}</h3>
        <p>{{comment.commentText.length>40 && !this.showLongText ? comment.commentText.substr(0, 110)+'...':comment.commentText}}</p>

        <h4 v-if="comment.commentText.length>40 && !this.showLongText" @click="this.showLongText=true">Показать весь</h4>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name:'comment-item',
    props:{
        comment:{
            type:Object,
            required:true
        }
    },
    data() {
        return {
            showLongText:false
        }
    },
    computed:{
        ...mapGetters({
            getUser:'userModule/getUser'
        }),
    },
}
</script>
<style lang="scss" scoped>
    div{
        color: var(--category-second-color);
        border: var(--category-second-color) 2px solid;
        border-radius: 13px;
        margin-top: 10px;
        padding: 10px;
        overflow: hidden;
        word-break:break-all;

        svg{
            float: right;
        }
    }
</style>