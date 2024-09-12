<template>
    <div class="recipe-page" v-if="currentPost.link">
        <section>

            <arrow-down @click="goToSection"/>
        
            <article class="adout">

                <div class="title-image">
                    <img :src="filePath" alt="img"  v-if="currentPost.fileName">
                </div>
                
                <div class="info">
                    <h2> {{currentPost.title}} ({{ currentPost.category }}) </h2>
                    <p>{{currentPost.description}}</p> 
                </div>
            </article>
        
            <article class="components">
                <h3>
                    Состав
                </h3>
                <ul>
                    <li v-for="component in currentPost.components" :key="component"  ref="li">{{  component }}</li>
                </ul>
            </article>
        
            <article class="recipe">
                <h3>
                    Рецепт
                </h3>
                <ul>    
                    <li v-for="(point, index) in currentPost.recipe" :key="point">{{ index + 1 }}.  {{ point }}</li>
                </ul>
            </article>

        
            <article class="comments">
                <h3> Комментарии </h3>
                <create-new-comment v-if="getUser.isActivated==true"/>
                <h4 v-else> Зарегестрируйтесь чтобы оставлять комментарии </h4>
                <comment-list/>
                <observer-block :action="()=>fetchComments(this.$route.params.link)"/>
            </article>

    </section>
</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    data() {
        return {
            currentPost:{}
        }
    },

    async mounted(){
        console.log(process.env.DEFAULT_DESCRIPTION_META)
        this.$store.dispatch('postModule/loadСurrentPost', this.$route.params.link)
            .then(post=>{
                this.currentPost = post
                this.$store.dispatch('styleModule/loadStyleCategory', this.currentPost.category)
                this.$store.dispatch('commentModule/mountComments', this.currentPost.category)
                this.updateMetaTags()
            })
    },

    computed:{
      ...mapGetters({
            getUser:'userModule/getUser',
        }),
        filePath() {
            return this.currentPost.fileName 
            ? process.env.VUE_APP_API_URL  + this.currentPost.fileName 
            : ''
        }
    },
    
    beforeUnmount(){
        // this.$store.dispatch('styleModule/resetStyle')
        const descriptionMeta = document.querySelector('meta[name="description"]')
        descriptionMeta.content = process.env.VUE_APP_DEFAULT_DESCRIPTION_META

        const keywordsMeta = document.querySelector('meta[name="keywords"]')
        keywordsMeta.content = process.env.VUE_APP_DEFAULT_KEYWORDS_META
    },

    methods:{
        ...mapActions({
            fetchComments: 'commentModule/fetchComments',
        }),
        goToSection() {
            const section = document.getElementsByClassName('recipe')[0];
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' })
            }
        },
        updateMetaTags(){
            document.title = this.currentPost.title

            const descriptionMeta = document.querySelector('meta[name="description"]')
            descriptionMeta.content = this.currentPost.description

            let keywordsMeta = document.querySelector('meta[name="keywords"]')
            keywordsMeta.content += `, ${this.currentPost.title}, ${this.currentPost.category}`
        }
    }
}
</script>
<style lang="scss" scoped>

h3{
    padding-bottom: 10px;
    margin-bottom: 15px;
    color: var(--category-main-color);
    border-bottom: 2px solid;
}
ul{
    list-style-type: none;
}
li{
    padding: 5px 0px 5px 30px;
    border-radius: 7px;
}

    .recipe-page{
        background: var(--category-main-color);
        min-height: calc(100vh - 65px);
        padding: 35px 0px 35px 0px;

        section{
            position: relative;
            min-height: 92.4vh;
            max-width:900px;
            margin:auto;
            
            .arrowDown{
                stroke: var(--category-main-color);
                background: var(--category-second-color);
                position: absolute;
                right: 10px;
                top: 10px;
                border-radius: 5px;
            }

            article{
                max-width: 900px;
                margin-bottom: 20px;
                padding: 20px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                border-radius: 10px;
            }

            .adout{
                background: var(--category-main-color);
                color: var(--category-second-color);
                display: flex;
                padding: 20px 0px 20px 0px;

                .title-image{
                    width: 50%;
                    max-height: 350px;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    img{
                        display: block;
                        margin: 0 auto 20px;
                        width: 70%;
                        max-width: 700px;
                        border-radius: 10px;
                    }
                }

                .info{
                    color: var(--category-second-color);
                    width: 50%;
                    padding: 10px;
                    border-radius: 10px;
                    
                    h2{
                        border-bottom: var(--category-second-color) 2px solid;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                        font-size: 24px;
                    }
                }
            }
            
            .components{
                background: var(--category-second-color);
                color: var(--category-main-color);
                
                ul li:nth-child(2n+1){
                    background-color: var(--modification-color);
                }
            }

            .recipe{
                background: var(--category-second-color);
                color: var(--category-main-color);

                ul li:nth-child(2n+1){
                        background-color: var(--modification-color);
                    }
                
            }

            .comments{
                padding: 20px;
                widows: 100%;
            
                h3{
                    color: var(--category-second-color);
                }
                h4{
                    font-size: 20px;
                    text-align: center;
                    margin-bottom: 20px;
                    font-style: italic;
                    color: var(--category-second-color);
                }
            }
        }
    }
    
    @media (max-width: 600px) {
        .adout{
            flex-direction: column;
            align-items: center;

            .title-image{
                height: 100wv;
            }

            .info{
                width: 100%;
            }
        }
    }   
</style>
