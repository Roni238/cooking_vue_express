<template>
    <div  class="preview">
        <div class="header" :style="{ backgroundColor: getEditCategory?.secondСolor}">
            
            <sidebar-button-icon :style="{stroke:getEditCategory?.mainColor}"/>
            
            <h3 :style="{color: getEditCategory?.mainColor}">
                light food
            </h3>

            <open-search-icon :style="{stroke:getEditCategory?.mainColor}"/>
            
        </div>

        <div class="wrapp" :style="{backgroundColor: getEditCategory?.mainColor,color: getEditCategory?.secondСolor}">
            <h3>
                В меню {{getSelectedCategory}}:
            </h3>

            <article :style="{color: getEditCategory?.mainColor}">

                <img src="https://www.pngkit.com/png/full/2-22768_pizza-png.png" alt="">
                <h3 :style="{color: getEditCategory?.secondСolor}">title test</h3>

                <!-- <p :style="{color: getEditCategory?.secondСolor}">description test</p> -->
               
            </article>
        </div>     
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import StyleService from "@/Service/styleService"

export default {
    name:'category-preview',
    computed:{
       ...mapGetters({
            getSelectedCategory:'styleModule/getSelectedCategory',
            getCurrentStyle:'styleModule/getCurrentStyle',
            getEditCategory:'styleModule/getEditCategory'
        }) 
    },
    watch:{
        async getSelectedCategory(category){
            await StyleService.getStyle(this.getSelectedCategory).then(res=>{
                this.$store.commit('styleModule/setSecondСolor',res.data.headerColor)
                this.$store.commit('styleModule/setMainColor',res.data.mainColor)
            })
        }
    }  
}
</script>
<style lang="scss" scoped>
    .preview{
        width: 100%;
        background-color: $main-color;
        color: aliceblue;
        margin: 40px 0;

        .header{
            background: $second-color;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 3px 0;
        }
        .wrapp{
            padding: 7px;
            overflow: hidden;
        }
        .list{
            overflow: hidden;
        }
        article{
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            padding: 10px 20px 5px 20px;
            max-width: 350px;
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 11;
            -webkit-box-orient: vertical;
            margin: auto;
            height: 350px;
            text-align: center;
        }
        img{
            width: 100%;
            height: 260px;
            margin-bottom: 10px;
        }
    }
</style>