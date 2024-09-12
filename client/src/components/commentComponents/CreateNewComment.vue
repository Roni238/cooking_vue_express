<template>
    <span>
        <input type="text" v-model="newComment.commentText" maxlength="400">
        <div>
            <button @click="this.$store.dispatch('commentModule/createNewComment',newComment);newComment.commentText=''">Добавить комментарий</button>
        </div>
    </span>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            newComment:{
                autor:'',
                commentText:'',
                postLink:this.$route.params.link
            },
        }
    },
    async mounted(){
        if(this.getUser.name){
            this.newComment.autor=this.getUser
        }
    },
    watch:{
        getUser(user){
            this.newComment.autor=user
        }
    },
    computed:{
        ...mapGetters({
            getUser:'userModule/getUser',
        }),
    },
    name:'create-new-comment'
}
</script>
<style lang="scss" scoped>
    span{
        color: var(--category-second-color);

        input{
            width: 100%;
            padding: 5px;
            font-size: 16px;
            border-radius: 10px;
            border: solid black 1px;
            margin-bottom: 10px;
            background: none;
            border: var(--category-second-color) 2px solid;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            color: var(--category-second-color);
        }

        div{
            display: flex;
            justify-content: flex-end;  
        
            
            button{
                border: none;
                padding: 7px;
                font-size: 14px;
                border-radius: 10px;
                background-color: var(--category-second-color);
                color: var(--category-main-color);
            }
        }
    }


</style>