<template>
    <ul>
        <router-link :to="{ name: 'menu', params: { category: category.categoryLink }}"  v-for="category in getCategories" :key="category._id">
            <li @click="showPanel" >
                {{ category.categoryName }}
            </li>
            
        </router-link>
        <loader-vue v-if="getCategories.length === 0"/>
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
    }),
    
  },
}
</script>
<style scoped lang="scss">
    li{
        border-bottom:var(--category-second-color) 4px dotted;
        color: var(--category-second-color);
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