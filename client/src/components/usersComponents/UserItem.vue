<template>
<div>
    <span class="buttons">
        <edit-button @click="editMode=true" v-if="!editMode"/>
        <confirm-button @click="editUser" v-else/>
  
        <delete-button 
          @click="this.$store.commit('setSelectedAction','usersModule/banUser');this.$store.commit('setSelectObj',user)"/>
    </span>

    <strong>Имя: </strong><p>{{ user.name }}</p>

    <strong>Почта: </strong><p>{{ user.email }}</p>

    <strong>Роль: </strong><p :class="{admin:user.role=='admin'}" v-if="!editMode">{{ user.role }}</p> 

    <role-selected @update:model-value="setNewUserRole" :model-value="user.role"  v-else/>
</div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
    name:'user-item',
    props:{
        user:{
            type:Object,
            required:true
        },
    },
    data() {
        return {
            editMode:false
        }
    },
    methods:{
        ...mapMutations({
            setNewUserRole:'usersModule/setNewUserRole',
        }),
        editUser(){
            this.$store.dispatch('usersModule/editRole', this.user)
            this.editMode=false
        }
    }
}
</script>
<style scoped>
    div{
        border: 1px solid black;
        margin-top: 10px;
        padding: 15px;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
    }
    .buttons{
        position: absolute;
        right: 15px;
        gap: 10px;
        display:flex;
        flex-direction: column;
    }
    p{
        font-size: 20px;
        max-width: 80%;
        overflow: hidden;
    }
    .admin{
        color: rgb(64, 200, 1);
    }
    select, input{
        height: 30px;
        padding: 0px 5px;
    }
</style>