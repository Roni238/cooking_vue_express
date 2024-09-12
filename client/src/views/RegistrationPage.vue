<template >
    <section class="registration">
            <h2>После авторизации вам будет доступно больше возможностей</h2>

                <div class="switcher">
                    <h3 @click="this.$store.commit('setShowLoginForm',true)" :class="{active:getShowLoginForm}">ВХОД</h3>
                    <h3 @click="this.$store.commit('setShowLoginForm',false)" :class="{active:!getShowLoginForm}">РЕГИСТРАЦИЯ</h3>
                </div>

                <Transition name="slide-fade">
                        <login-form v-if="getShowLoginForm"/>
                        <registration-form v-else/>
                </Transition> 
    </section>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    computed:{
    ...mapGetters({
        getShowLoginForm:'getShowLoginForm',
    })
  },
  mounted(){
    this.$store.dispatch('styleModule/resetStyle')
  },
}
</script>
<style scoped lang="scss">
.slide-fade-enter-active {
    transition: all .3s ease-out;
}  
.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: scale(.5%);
}
.active{
 color: var(--category-second-color);
 border-bottom: var(--category-second-color) 2px solid;
}

    section{
        max-width:900px;
        margin:auto;
        padding: 10px;
        height:100vh;
	    font-family: Roboto, -apple-system, 'Helvetica Neue', 'Segoe UI', Arial, sans-serif;

        h2{
            margin: 10px;
            text-align: center;
        }

        .switcher{
            display: flex;
            justify-content: space-around;
            margin-bottom:20px;

            h3{  
                color: rgb(102 89 73);
                cursor: pointer;
                font-size: 18px;
            }
        }
    }
</style>