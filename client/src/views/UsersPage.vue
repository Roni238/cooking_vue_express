<template >
    <div class="users">
        <h2>Пользователи:</h2>
        <users-search/>
        <users-list/>
        <observer-block :action="loadUsers"/>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default{
    mounted(){
        this.$store.dispatch('styleModule/resetStyle')
    },
    methods:{
        ...mapActions({
            loadUsers: 'usersModule/loadUsers',
        }),
    },
}
</script>
<style lang="scss" scoped>
    .users{
        max-width:1000px;
        margin:auto;
        padding-top: 20px;

        h2{
            margin-bottom: 10px;
        }
    }
</style>