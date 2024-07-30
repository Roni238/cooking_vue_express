<template>
<div class="item">
    <p v-if="!editMode"> {{category.categoryName}} </p>  
    
    <form @submit.prevent="confirmRenameCategory" v-else>
      <input-model class="edit_input" :modelValue="category.categoryName" required @update:modelValue="setNewCategoryName" v-focus/>
    </form>

    <span>
      <confirm-button @click="confirmRenameCategory" v-if="editMode"/>
      <edit-button @click="openRenameCategory"  v-else/>
      <delete-button @click="openDeletePopup"/>
    </span>
    
</div>
</template>
<script>
import {mapMutations} from 'vuex'

export default {
    name:'category-item',
    props:{
      category:{
        require:true,
        type:Object
      }
    },
    data() {
      return {
        editMode:false,
      }
    },
    methods:{
      ...mapMutations({
        setNewCategoryName:'categoryModule/setNewCategoryName',
      }),
      openDeletePopup(){
        this.$store.commit('setSelectedAction','categoryModule/removeСategory')
        this.$store.commit('setSelectObj',this.category)
      },
      confirmRenameCategory(){
        this.$store.dispatch('categoryModule/editCategory',this.category)
        this.editMode=false
      },
      openRenameCategory(){
        this.editMode=true
      }
    }
}
</script>
<style scoped lang="scss">
  .item{
    display: flex;
    justify-content: space-between;
    background-color: rgba(59, 59, 59, 0.369);
    padding: 7px 10px;
    border-radius: 10px;
    margin-top: 10px;
    align-items: center;
  }
  span{
    align-items: center;
    display:flex;
    gap: 10px;
  }
  .edit_input{
    width:225px;
  }
</style>