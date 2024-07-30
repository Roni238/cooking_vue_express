<template>
    <input-model :model-value="searchCategoryQuery" @update:model-value="setSearchCategoryQuery" type="search" placeholder="Поиск...."/>
</template>
<script>
import {mapState,mapMutations} from 'vuex'

export default {
    name: 'categoriy-search',
    computed:{
        ...mapState({
            searchCategoryQuery: state => state.categoryModule.searchCategoryQuery
        })
    },
    methods:{
        ...mapMutations({
            setSearchCategoryQuery: 'categoryModule/setSearchCategoryQuery',
        }),
    }
}
</script>
<style scoped lang="scss">
input{
    margin-bottom: 20px;
    background: rgba(59, 59, 59, 0.369);
    
    &::placeholder{
        color: gray;
    }
}
</style>