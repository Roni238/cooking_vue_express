<template>
    <transition name="slide-fade">
        <div v-if="getErrorMessage">
            <p>{{ getErrorMessage }}</p> 
        </div>
    </transition>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    name:'error-message',
    computed:{
        ...mapGetters({
            getErrorMessage:'errorModule/getErrorMessage'
        })
    }
}
</script>
<style lang="scss" scoped>
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        z-index: 100;
        min-height: 70px;
        position: fixed;
        right: 15px;
        bottom: 15px;
        color: var(--category-main-color);
        max-width: 300px;
        border-radius: 10px;  
        transition: opacity 1s ease-out;
        opacity: 1;
        background-color: var(--category-second-color);
    }

    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }
      
    .slide-fade-leave-active {
        transition: all 0.7s ease-in-out;
    }
      
    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateY(20px);
        opacity: 0;
    }
    p{
        font-size: 18px;
    }
</style>