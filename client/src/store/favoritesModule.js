import FavoritesServise from "@/Service/favoritesServise"

export default {
    state:()=>({
        user:{},
        favoritesPosts:[],
        favoritesId: [...JSON.parse(localStorage.getItem('favoritesPost')) || []]
    }),
    mutations:{
        setFavoritesPosts(state, posts){
            state.favoritesPosts=posts
            state.favoritesId = posts.map(post=>post._id)
        },
        addFavoritePost(state,post){
            state.favoritesPosts.push(post)
            state.favoritesId.push(post._id)
        },
        removeFavoritePost(state, postId){
            state.favoritesPosts = state.favoritesPosts.filter(favoritePosts =>favoritePosts._id!==postId)
            state.favoritesId = state.favoritesId.filter(id=>id!==postId)
        }
    },
    getters:{
        getFavoritesPosts(state){
            return state.favoritesPosts
        },
        getFavoritesId(state){
            return state.favoritesId
        },
    },
    actions:{
        async loadFavorites({commit, rootGetters, dispatch}){
            try {
                const { data: favoritesData } = await FavoritesServise.loadFavorites(rootGetters['userModule/getUser'].id)
                commit('setFavoritesPosts', favoritesData)
                dispatch('saveFavoritesToLocalStorage')
            } catch (error) {
                const errorMessage = `Ошибка загрузки избранных: ${error?.response?.data?.message || error?.message}`
                commit('errorModule/setErrorMessage', errorMessage, { root: true })
            }
        },
        async pushFavorites({commit, rootGetters, dispatch}, post){
            try {
                await FavoritesServise.pushFavorites(rootGetters['userModule/getUser'].id, post)
                commit('addFavoritePost', post)
                dispatch('saveFavoritesToLocalStorage')
            } catch (error) {
                const errorMessage = `Ошибка добавления в избранные: ${error?.response?.data?.message || error?.message}`
                commit('errorModule/setErrorMessage', errorMessage, { root: true })
            }
        },
        async removeFavorites({commit, rootGetters, dispatch}, postId){
            try {
                await FavoritesServise.removeFavorites(rootGetters['userModule/getUser'].id, postId)
                commit('removeFavoritePost', postId)
                dispatch('saveFavoritesToLocalStorage')
            } catch (error) {
                const errorMessage = `Ошибка удаления из избранных: ${error?.response?.data?.message || error?.message}`
                commit('errorModule/setErrorMessage', errorMessage, { root: true })
            }
        },
        saveFavoritesToLocalStorage({ state }) {
            localStorage.setItem('favoritesPost', JSON.stringify(state.favoritesId))
        }
    },
    namespaced:true
}