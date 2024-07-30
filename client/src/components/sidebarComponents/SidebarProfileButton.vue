<template>
    <div class="profile" @click.stop="this.$store.commit('sidebarModule/setShowSidebar',false)" v-if="!getShowCategories">
        <div v-if="getUser.name" :style="{backgroundColor: getCurrentStyle?.secondСolor}">

          <svg viewBox="-3 -3 30 30" stroke="currentColor" stroke-width="2" fill="none" :style="{stroke: getCurrentStyle?.mainColor}">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" ></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          <p @click="this.$store.dispatch('userModule/logout').then(()=>this.$router.push('/'))" :style="{color: getCurrentStyle?.mainColor}"> Выйти ({{getUser.name}})</p>
          
        </div>
      

        <div v-else @click="this.$router.push('/registration')" :style="{backgroundColor: getCurrentStyle?.secondСolor}">
          <p :style="{color: getCurrentStyle?.mainColor}">Войти</p>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    computed:{
        ...mapGetters({
            getShowCategories:'sidebarModule/getShowCategories',
            getUser:'userModule/getUser',
            getCurrentStyle:'styleModule/getCurrentStyle',
        })
    },
    name:'sidebar-profile-button'
}
</script>
<style lang="scss" scoped>
.profile{
    margin-top: auto;
    cursor:pointer;
    
    div{
      font-size: 20px;
      display: flex;
      background-color:$second-color;
      align-items: center;
      min-height: 6vh;
      padding-left: 15px;
      border-bottom-right-radius: 15px;
      font-size: 16px;

      p{
        color: $main-color;
        max-width: 200px;
        padding-left: 15px;
      }
      svg{
        stroke: $main-color;
      }
      a{
        color: $main-color;
      }
    }
  }
</style>