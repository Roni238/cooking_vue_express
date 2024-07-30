<template>
    <div class="create-post-page">
        <section>
            <categories-selected  @update:model-value="setNewPostCategories"/> 
         </section>

        <section class="info">
            <upload-image/>
            <div>
                <input-model required :model-value="newPostTitle" @update:model-value="setNewPostTitle" placeholder="Название" class="title"/>
                <textarea-model placeholder="Описание" required :model-value="newPostDescription" @update:model-value="setNewPostDescription" maxlength="255"/>
            </div>   
        </section>

        

        <section>
            <h3>Состав</h3>
            <add-item-list :mutationPost="'pushComponents'"/>
            <item-list :list="getComponents" :dispatch="'newPostModule/deleteComponent'"/>   
        </section>

        <section>
            <h3>Рецепт</h3>
            <add-item-list :mutationPost="'pushRecipe'"/>
            <item-list :list="getRecipe" :dispatch="'newPostModule/deleteRecipeParagraph'"/>   
        </section>
        
        
        
        <button @click="this.$store.dispatch('newPostModule/createNewPost').then(res=>newPostLink=res)">Создать новый пост</button>

        <router-link 
         v-if="newPostLink"
         :to="{name:'recipe', params: { link:newPostLink}}"
        >
         Новый рецепт создан! Хотите посмотреть?
        </router-link>
    </div>
</template>

<script>
 import {mapState,mapMutations, mapGetters} from 'vuex'
export default {
    data() {
        return {
            newPostLink:''
        }
    },
    computed: {
        ...mapState({
            newPostTitle:state=>state.newPostModule.newPost.title,
            newPostDescription:state=>state.newPostModule.newPost.description,
        }),
        ...mapGetters({
            getComponents:'newPostModule/getComponents',
            getRecipe:'newPostModule/getRecipe',
        }),
    },
    methods:{
        ...mapMutations({
            setNewPostTitle:'newPostModule/setNewPostTitle',
            setNewPostDescription:'newPostModule/setNewPostDescription',
            setNewPostCategories:'newPostModule/setNewPostCategory'
        }),
    },
    mounted(){
        this.$store.commit('styleModule/setDefaultStyle')
    },
}
</script>

<style scoped lang="scss">
@media (min-width: 1000px) {
    .create-post-page{
        max-width:1000px;
        margin:auto;
    }
}
.create-post-page{
    padding: 10px 20px;
    gap: 10px;
}

h3{
    margin-bottom: 10px;
}
section{
    border: solid 2px black;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;   
}
.info{
    display: grid;
    grid-template-rows: 1fr;
    gap: 10px;
    grid-template-columns: 1fr 1fr;

    textarea{
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border: none;
    }

}
.title{
    width: 100%;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
}

button{
    width: 100%;
    padding: 5px;
    font-size: 18px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: $second-color;
    border: 2px solid black;
    color: $main-color;
}

@media (max-width: 750px) {
    .info{
        display: block;

        div{
            margin-top: 10px;
        }
    }
}
</style>