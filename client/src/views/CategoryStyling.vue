<template >
<div class="categoriy-styling">
    <h2>Редактируемая категория</h2>

    <categories-selected :model-value="editCurrentCategory.selectedCategory" @update:model-value="setSelectedCategory"/>

    <section>
        <h2>Цвет фона</h2>
        <input-model type="color" :model-value="editCurrentCategory.mainColor" @update:model-value="setMainColor"/>
    </section>
    
    <section>
        <h2>Цвет шапки и обводок</h2>
        <input-model type="color" :model-value="editCurrentCategory.secondСolor" @update:model-value="setSecondСolor"/>
    </section>
    
    <button @click="this.$store.dispatch('styleModule/styleEdit')">Стилизовать</button>

    <category-preview/>
</div>
</template>
<script>
import { mapMutations, mapState} from 'vuex'

export default {
    methods:{
        ...mapMutations({
            setSelectedCategory:'styleModule/setSelectedCategory',
            setMainColor:'styleModule/setMainColor',
            setSecondСolor:'styleModule/setSecondСolor',
        }),
    },
    computed:{
        ...mapState({
            editCurrentCategory: state => state.styleModule.editCurrentCategory,
        }),
    },
    mounted(){
        this.$store.dispatch('styleModule/resetStyle')
    },
}
</script>
<style scoped lang="scss">
div input{
    width: 50px;
    height: 50px;
}

    .categoriy-styling{
        max-width:1000px;
        margin:auto;
        box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.3);
        padding: 10px 20px;

        section{
            display: flex;
            gap: 10px;
            margin-top: 5px;
            align-items: center;
        }

        h2{
            margin: 10px 0px;
        }

        button{
            padding: 10px;
            border: none;
            font-weight: 600;
            background-color: var(--category-second-color);
            border-radius:10px;
            color: var(--category-main-color);
        }
    }
</style>