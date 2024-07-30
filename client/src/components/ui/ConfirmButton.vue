<template>
    <svg :style="{stroke:getCurrentStyle.mainColor}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name:'confirm-button',
    computed:{
      ...mapGetters({
            getCurrentStyle:'styleModule/getCurrentStyle',
        }) 
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