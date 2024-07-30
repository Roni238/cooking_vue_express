<template>
    <div>
        <sidebar-button 
            v-for="(button, index) in getSidebarButtons" 
            :key="index"
            :title="button.title"
            :icon="button.icon"
            :nameLink="button.nameLink"
            :checkingAvailability="button.checkingAvailability"
        />
    </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    computed:{
        ...mapGetters({
            getSidebarButtons:'sidebarModule/getSidebarButtons'
        })
    },
    name:'sidebar-buttons-list'
}
</script>
