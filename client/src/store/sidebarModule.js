

export default {
    state:()=>({
        showSidebar:false,
        showCategories:false,
        sidebarButtons:[
            {
                title:'Категории',
                icon:'categories-icon',
                checkingAvailability:'',
            },
            {
                title:'Случайный рецепт',
                icon:'random-recipe-icon',
                checkingAvailability:'',
            },
            {
                title:'Избранные',
                icon:'favorites-recipes-icon',
                nameLink:'favorites',
                checkingAvailability:'authOnly',
            },
            {
                title:'О нас',
                checkingAvailability:'',
                icon:'about-icon',
                nameLink:'about'
            },
            {
                title:'Создать рецепт',
                checkingAvailability:'cooker',
                icon:'new-recipe-icon',
                nameLink:'createRecipe'
            },
            {
                title:'Настройки категорий',
                checkingAvailability:'admin',
                icon:'category-settings-icon',
                nameLink:'settingsCategory'
            },
            {
                title:'Пользователи и роли',
                checkingAvailability:'admin',
                icon:'users-icon',
                nameLink:'users'
            },
            {
                title:'Стилизация категорий',
                checkingAvailability:'admin',
                icon:'category-styling-icon',
                nameLink:'categoryStyling'
            }
        ]
    }),
    getters:{
        getSidebarButtons(state){return state.sidebarButtons},
        getShowSidebar(state){return state.showSidebar},
        getShowCategories(state){return state.showCategories},
    },
    mutations:{
        setShowSidebar(state,value){state.showSidebar=value},
        setShowCategories(state,value){state.showCategories=value},
    },
    namespaced:true
}