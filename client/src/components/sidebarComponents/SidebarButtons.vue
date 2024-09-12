<template>
    <div class="sidebar-button">
        <div v-if="visibility"  @click="Click" >
            <component :is="icon"/>
            <router-link :to="{name: nameLink}">{{title}}</router-link>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    props:{
        title:String,
        icon:String,
        checkingAvailability:String,
        nameLink:String,
    },
    computed:{
        ...mapGetters({
            getUser:'userModule/getUser',
        }),
        visibility() {
            switch(this.checkingAvailability){
                case 'authOnly':
                    return !!this.getUser?.id
                    break
                case 'cooker':
                    return this.getUser?.role =='cooker'||this.getUser?.role =='admin'
                    break
                case 'admin':
                    return this.getUser?.role =='admin'
                    break
                default:
                    return true;
            }
        }
    },
    methods:{
        Click(){
            switch(this.title){
                case 'Категории':
                    this.$store.commit('sidebarModule/setShowCategories', true)
                    break
                case 'Случайный рецепт':
                    this.$store.dispatch('postModule/getRandomPost').then(link=>this.$router.push({ name: 'recipe', params: {link}}))
                    break
                default:
                    this.$store.commit('sidebarModule/setShowSidebar',false)
            }
        }
    },
    name:'sidebar-button',
}
</script>
<style lang="scss">
    .sidebar-button div{
        display: flex;
        align-items: center;
        margin: 3px 15px;
        
        svg{ 
            margin-right: 12px;
            stroke:var(--category-second-color);
        }
        a{
            color: var(--category-second-color);
        }
      }
</style>