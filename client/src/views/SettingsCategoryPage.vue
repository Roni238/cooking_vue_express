<template>
    <div class="create-category">
        <h2>Создать новую категорию</h2>    

        <form class="create" @submit.prevent="createNewCategory">
            <input-model v-model.trim="newCategory" v-focus  placeholder="Название новой категории" required/>

            <button type="submit">
                <add-category-icon/>
            </button>
        </form>
        

        <h2>Категории:</h2>
        <categoriy-search/>
        <categoriy-list/>
    </div>
</template>
  
<script>
export default {
    name: 'HomeView',
    data() {
        return {
            newCategory:'',
        }
    },
    methods:{
        async createNewCategory() {
            await this.$store.dispatch('categoryModule/CreateNewCategories', this.newCategory)
            this.newCategory = ''
        },
    },
    mounted(){
        this.$store.commit('styleModule/setDefaultStyle')
    },
}
  </script>
<style scoped lang="scss">
.create{
    display: flex;
    color: $second-color;
    background-color: rgba(59, 59, 59, 0.369);
    height: 45px;
    border-radius:10px;
}
.create input{
    background: none;
}
.create-category{
    max-width:1000px;
    margin:auto;
    padding-top: 10px;
    color: rgb(69, 50, 46);
}
button{
    background: $second-color;
    padding: 5px;
    border-radius: 0px 10px 10px 0px;
    float: right;
    border: none;
    
    svg{
        stroke: $main-color;
    }
}
h2{
    width: 100%;
    margin: 20px 0px;
}
input{
    height: 44px;
}
</style>