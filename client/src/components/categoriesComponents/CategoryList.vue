<template>
  <div v-if="getSearchedCategories.length>0">
      <category-item v-for="category in getSearchedCategories" :key="category._id" :category="category"/>
  </div>

  <loader-vue v-else/>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'categoriy-list',
  computed: {
  ...mapGetters({
      getSearchedCategories:'categoryModule/getSearchedCategories',
      getEditMode:'categoryModule/getEditMode'
    }),
  }
}
</script>
<style scoped>
span{
  align-items: center;
  display:flex;
  gap: 10px;
}
.edit_input{
  width:225px;
}
</style>