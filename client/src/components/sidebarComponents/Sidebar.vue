<template>
  <Transition name="slide-fade"> 
    <aside @click.stop>

      <transition-group name="slide-fade">
          <sidebar-buttons-list v-if="!getShowCategories" />
          <sidebar-categories v-else/>
      </transition-group>

      <sidebar-profile-button/>
    </aside>
  </Transition>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed:{
    ...mapGetters({
        getShowCategories:'sidebarModule/getShowCategories',
    })
  },
  mounted(){
        this.$store.dispatch('categoryModule/loadCategories')
  },
  name:'sidebar-vue'
}
</script>
<style lang="scss" scoped>

aside:after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.05);
  z-index:-1;
  border-radius: 15px;
}
aside{
    padding-top: 65px;
    position: fixed;
    left: 0;
    top: 0;
    color: #45322E;
    background: var(--category-main-color);
    color: var(--category-second-color);
    z-index: 120;
    transition: all 0.5s ease;
    min-width: 255px;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
}

  .slide-fade-enter-active {
    transition: all .3s ease-out;
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-100%);
  }
  
</style>