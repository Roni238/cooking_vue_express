<template>
  <div @click="hideSidebar">
    <activation-popup v-if="userActivated"/>
    <delete-popup v-if="getShowDeletePopup"/>
    <error-message/>
    <sidebar-vue v-show="getShowSidebar"/>
    

    <header-vue/>
    <div class="router">
      <router-view :key="$route.fullPath"/> 
    </div>

  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

  .router{
    min-height: calc(100vh - 65px);
    margin-top: 65px;
  }
  #app {
    font-family: 'Comfortaa', sans-serif;
    background: $main-color;
    box-sizing: border-box;
    overflow: hidden;
  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Comfortaa', sans-serif;
  }
  a{
    font-weight: bold;
    text-decoration: none;
    color: #45322E;
  }
  svg{
    cursor: pointer;
    width: 34px;
    height: 34px;
    stroke-width:2;
  }
</style>

<script>
import {mapGetters} from 'vuex'

export default {
  computed:{
    ...mapGetters({
      getShowSidebar:'sidebarModule/getShowSidebar',
      getShowDeletePopup:'getShowDeletePopup',
      getCurrentStyle:'styleModule/getCurrentStyle',
      getUser:'userModule/getUser',
    }),
    userActivated(){
      return this.getUser.isActivated==false && !! this.getUser.email
    }
  },
  methods:{
    hideSidebar(){
      this.$store.commit('sidebarModule/setShowSidebar', false)
      this.$store.commit('sidebarModule/setShowCategories',false)
    }
  }
}
</script>