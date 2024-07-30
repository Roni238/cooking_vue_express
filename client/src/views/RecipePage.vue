<template>
    <div class="recipe-page" :style="{backgroundColor: getCurrentStyle?.mainColor}" v-if="currentPost.link">
        <section>

            <arrow-down :style="{stroke:getCurrentStyle?.mainColor, backgroundColor:getCurrentStyle?.secondСolor}" @click="goToSection"/>
        
            <article class="adout" :style="{ backgroundColor:getCurrentStyle?.mainColor, color:getCurrentStyle?.secondСolor}">

                <div class="title-image">
                    <img :src="apiPath+currentPost.fileName" alt="img"  v-if="currentPost.fileName">
                </div>
                
                <div class="info" :style="{color: getCurrentStyle?.secondСolor}">
                    <h2 :style="{ borderBottom: `2px solid ${getCurrentStyle?.secondСolor}`}">
                        {{currentPost.title}} ({{ currentPost.category }}) 
                    </h2>

                    <p>{{currentPost.description}}</p> 
                </div>
            </article>
        
            <article :style="{ backgroundColor:getCurrentStyle?.secondСolor, color:getCurrentStyle?.mainColor}">
                <h3 :style="{ borderBottom: `2px solid ${getCurrentStyle?.mainColor}`}">
                    Состав
                </h3>

                <ul>
                    <li v-for="component in currentPost.components" :key="component"  ref="li">{{  component }}</li>
                </ul>
            </article>
        
            <article id="recipe" :style="{ backgroundColor:getCurrentStyle?.secondСolor, color:getCurrentStyle?.mainColor}">
                <h3 :style="{ borderBottom: `2px solid ${getCurrentStyle?.mainColor}`}">
                    Рецепт
                </h3>

                <ul>    
                    <li v-for="(point, index) in currentPost.recipe" ref="li" :key="point">{{index+1 }}.  {{ point }}</li>
                </ul>
            </article>

        
            <article class="comments">
                <h3 :style="{color:getCurrentStyle?.secondСolor}">Комментарии:</h3>

                <create-new-comment v-if="getUser.isActivated==true" :style="{color:getCurrentStyle?.secondСolor}"/>

                <h4 v-else :style="{color:getCurrentStyle?.secondСolor}">Зарегестрируйтесь чтобы оставлять комментарии</h4>

                <comment-list :style="{color:getCurrentStyle?.secondСolor}"/>

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
            currentPost:{},
            secondColor:'',
            apiPath:process.env.VUE_APP_API_URL
        }
    },
    async mounted(){
        this.$store.dispatch('postModule/loadСurrentPost', this.$route.params.link)
            .then(res=>this.currentPost=res)
            .then(()=>this.$store.dispatch('styleModule/loadStyleCategory', this.currentPost.category))
            .then(()=>this.$store.dispatch('commentModule/mountComments', this.currentPost.category))
            .then(()=>document.title = `${this.currentPost.title}`)
            .then(()=>this.liStyled())
    },
    computed:{
      ...mapGetters({
            getCurrentStyle:'styleModule/getCurrentStyle',
            getUser:'userModule/getUser',
        }) 
    },
    
    methods:{
        ...mapActions({
            fetchComments: 'commentModule/fetchComments',
        }),
        async liStyled(){
            this.secondColor = await this.$store.dispatch('styleModule/modificationColor')
            const liArr=this.$refs?.li.filter((item, index)=>!((index)%2))
            liArr.map(el=>el.style.backgroundColor=this.secondColor)
        },
        goToSection() {
            const section = document.getElementById('recipe')
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' })
            }
        },
    }
}
</script>
<style lang="scss" scoped>

.recipe-page{
    min-height: calc(100vh - 65px);
    padding: 35px 0px 35px 0px;
}
article{
    max-width: 900px;
    margin-bottom: 20px;
    padding: 20px;
    //background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}
h1{
    //color: #bf360c;
    text-align: center;
    margin-bottom: 10px;
    font-weight: bold;
}
h2{
    //color: #bf360c;
    //border-bottom: 2px solid #d84315;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-size: 24px;
}
h3{
    padding-bottom: 10px;
    margin-bottom: 15px;
}
h4{
    font-size: 20px;
    //color: #d84315;
    text-align: center;
    margin-bottom: 20px;
    font-style: italic;
}
.description{
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
    //color: #4e342e;
}
img{
    display: block;
    margin: 0 auto 20px;
    width: 70%;
    max-width: 700px;
    border-radius: 10px;
}
ul{
    list-style-type: none;
    
}
li{
    padding: 5px 0px 5px 30px;
    border-radius: 7px;
}

.adout{
    display: flex;
    padding: 20px 0px 20px 0px;
}
section{
    position: relative;
    min-height: 92.4vh;
    max-width:900px;
    margin:auto;

    .arrowDown{
        position: absolute;
        right: 10px;
        top: 10px;
        border-radius: 5px;
    }
    .title-image{
        width: 50%;
        max-height: 350px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    

      }
    .info{
        width: 50%;
        padding: 10px;
        border-radius: 10px;
    }
}
  .comments{
    padding: 10px;
    widows: 100%;
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
