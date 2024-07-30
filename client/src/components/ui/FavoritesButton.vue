<template>
  <svg
    @click="click()"
    :style="{ stroke: favoriteStatus ? '#FF0000' : getCurrentStyle?.mainColor, backgroundColor: getCurrentStyle?.secondСolor }"
    viewBox="-3 -3 30 30" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name:'favorites-button',
    props:{
      post:{
        type:Object,
        requred:true
      },
    },
    data() {
      return {
        favoriteStatus:false
      }
    },
    computed:{
      ...mapGetters({
        getCurrentStyle:'styleModule/getCurrentStyle',
        getFavoritesId:'favoritesModule/getFavoritesId',
      }),
    },
    methods:{
      click(){
        if(!this.favoriteStatus){
          this.$store.dispatch('favoritesModule/pushFavorites',this.post) 
          this.favoriteStatus=!this.favoriteStatus
        }else{
          this.$store.dispatch('favoritesModule/removeFavorites',this.post._id)
          this.favoriteStatus=!this.favoriteStatus 
        }
      }
    },
    mounted(){
      this.favoriteStatus = this.getFavoritesId.includes(this.post._id)
    }
}
</script>
<style scoped lang="scss">
svg{
    background: $second-color;
    border-radius: 5px;
    padding: 5px;
}
</style>