<template>
    <div>
        <user-item :user="user" v-for="user in getSearchedUsers" :key="user.id"/>
    </div>   
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name:'users-list',
    computed: {
    ...mapGetters({
            getSearchedUsers:'usersModule/getSearchedUsers',
        }),
    },
}
</script>