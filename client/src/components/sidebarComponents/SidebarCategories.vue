<template>
    <ul>
        <router-link :to="{ name: 'menu', params: { category: category.categoryLink }}"  v-for="category in getCategories" :key="category._id" v-if="getCategories.length>0">
            <li @click="showPanel" 
                :style="{color: getCurrentStyle?.secondСolor, borderBottom: `${getCurrentStyle?.secondСolor} 4px dotted`}" >
                {{ category.categoryName }}
            </li>
            
        </router-link>
        <loader-vue v-else/>
    </ul>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    name:'sidebar-categories',  
    methods: {
        showPanel(){
            this.$store.commit('sidebarModule/setShowCategories',false)
            this.$store.commit('sidebarModule/setShowSidebar',false)
        }
    }, 
    computed:{
    ...mapGetters({
        getCategories:'categoryModule/getCategories',
        getCurrentStyle:'styleModule/getCurrentStyle',
    }),
    
  },
}
</script>
<style scoped lang="scss">
    li{
        display: flex;
        align-items: center;
        margin: 15px;
        font-size: 16px;
        padding-bottom: 5px;
    }
    div{
        margin: 15px;  
    }
    ul{
        overflow: auto;
    }
</style>