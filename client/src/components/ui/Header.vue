<template>
  <header :style="{ backgroundColor:getCurrentStyle?.secondСolor}">
      <div>
        <arrow-icon :style="{stroke:getCurrentStyle?.mainColor}" 
          @click.stop="showCategories" v-if="getShowSidebar"
        />
        
        <sidebar-button-icon :style="{stroke:getCurrentStyle?.mainColor}" 
          @click.stop="openSidebar" v-if="!getShowSearch &&!getShowSidebar"
        />
        
        <hide-search-icon :style="{stroke:getCurrentStyle?.mainColor}" 
          @click="hideSidebar" v-if="getShowSearch"
        />
        
      </div> 
     
      
      <router-link to="/" v-if="!getShowSearch">
        <h2 :style="{ color:getCurrentStyle?.mainColor}">light food</h2>
      </router-link>

      <form-styled @submit.prevent="search" v-else>
        <post-search  v-focus :style="{ color:getCurrentStyle?.secondСolor, backgroundColor: getCurrentStyle?.mainColor}"/>
      </form-styled>
      
      
      <div @click="search" class="search">
        <open-search-icon :style="{stroke:getCurrentStyle?.mainColor}"/>
      </div>
  </header>
</template>
<script>
import {mapGetters} from 'vuex'

  export default {
      name:'header-vue',
      computed:{
      ...mapGetters({
          getShowCategories:'sidebarModule/getShowCategories',
          getShowSearch:'getShowSearch',
          getShowSidebar:'sidebarModule/getShowSidebar',
          getCurrentStyle:'styleModule/getCurrentStyle',
        }) 
      },
      methods:{
        search(){
          if(this.getShowSearch){
            this.$store.dispatch('postModule/findPost', this.$router)           
          }else{
            this.$store.commit('setShowSearch',true)
          }
        },
        showCategories(){
          this.getShowCategories ? this.$store.commit('sidebarModule/setShowCategories',false) : this.$store.commit('sidebarModule/setShowSidebar',false)
        },
        openSidebar(){
          this.$store.commit('sidebarModule/setShowSidebar',true)
        },
        hideSidebar(){
          this.$router.push('/')
          this.$store.commit('setShowSearch',false)
          this.$store.commit('postModule/setSearchPostQuery','')
        }
      }
}
</script>
<style lang="scss" scoped>
  header{
    background-color: $main-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 65px;
    position: fixed;
    top: 0px;
    z-index:1000;
    padding: 15px 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    transition: background-color .3s ease-in-out;
  }
  div{
    margin: 0 20px;
  }
  h2{
    cursor: pointer;
  }
  @media (min-width: 800px) {
    .search svg{
      margin: 0 10px 0px 0px;
    }
  }
  form{
    padding: 0px;
  }
</style>