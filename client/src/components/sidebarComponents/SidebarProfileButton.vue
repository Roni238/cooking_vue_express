<template>
    <div class="profile" @click.stop="this.$store.commit('sidebarModule/setShowSidebar',false)" v-if="!getShowCategories">
        <div v-if="getUser.name">

          <profile-icon/>
          <p @click="this.$store.dispatch('userModule/logout').then(()=>this.$router.push('/'))"> Выйти ({{getUser.name}})</p>
          
        </div>
      

        <div v-else @click="this.$router.push('/registration')">
          <p>Войти</p>
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
      background: var(--category-second-color);
      align-items: center;
      min-height: 6vh;
      padding-left: 15px;
      border-bottom-right-radius: 15px;
      font-size: 16px;

      p{
        color: var(--category-main-color);
        max-width: 200px;
        padding-left: 15px;
      }
      svg{
        stroke: var(--category-main-color);
      }
      a{
        color: var(--category-main-color);
      }
    }
  }
</style>