import PostService from "@/Service/postService"


export default {
    state:()=>({
        posts:[],
        searchPost:[],
        searchPostQuery:''
    }),
    mutations:{
        setPosts(state,value){
            state.posts=[...state.posts,...value]
        },
        setSearchPost(state,value){
            state.searchPost=value
        },
        pushPost(state,value){
            state.posts.push(value)
        },
        setSearchPostQuery(state,value){
            state.searchPostQuery=value
        },
    },
    getters:{
        getSearchedPosts(state){return state.searchPost},
        getPosts(state){return state.posts},
    },
    actions:{
        async mountedPost({state,commit}, category='all'){
            try {
                state.posts=[]
                const postsData = await PostService.getPosts(category,0)
                commit('setPosts', postsData.data)
                if(category!='all' && postsData.data.length>0){
                    document.title=postsData.data[0]?.category
                }
            } catch (error) {
                window.location.href = process.env.VUE_APP_CLIENT_URL
                alert('Странница не найденна')
            }
        }, 
        async loadMorePosts({commit,state}, category='all'){
            try {
                if(state.posts.length>0){
                    const postsData = await PostService.getPosts(category,state.posts.length)
                    commit('setPosts', postsData.data)
                }
            } catch (error) {
                const errorMessage = `Ошибка загрузки постов: ${error?.response?.data?.message || error?.message}`
                commit('errorModule/setErrorMessage', errorMessage, { root: true })
            }
        },
        async getRandomPost(){
            try {
                const postR = await PostService.randomPost()
                return postR.data.link 
            } catch (error) {
                window.location.href = process.env.VUE_APP_CLIENT_URL
            } 
        },
        async loadСurrentPost({commit},link){
            try {
                const { data: currentPostData } = await PostService.getСurrentPost(link)
                if(currentPostData){
                    return currentPostData
                }else{                    
                    window.location.href = process.env.VUE_APP_CLIENT_URL
                    alert('Странница не найденна')
                }
            } catch (error) {
                const errorMessage = `Ошибка загрузки страницы: ${error?.response?.data?.message || error?.message}`
                commit('errorModule/setErrorMessage', errorMessage, { root: true })
            }
        },
        async removePost({state},_id){
            try {
                await PostService.removePost(_id)
                state.posts = state.posts.filter(post =>post._id!=_id)
              } catch (error) {
                const errorMessage = `Ошибка удаления поста: ${error?.response?.data?.message || error?.message}`
                commit('errorModule/setErrorMessage', errorMessage, { root: true })
              }
        },
        async findPost({commit,state}, router){
            try { 
                if(state.searchPostQuery){
                    router.push({
                        path: '/search',
                        query: { searchParams: state.searchPostQuery }
                    })
                    const { data: findPosts } = await PostService.findPost(state.searchPostQuery)
                    commit('setSearchPost', findPosts)
                }                
            } catch (error) {
                const errorMessage = `Ошибка поиска поста: ${error?.response?.data?.message || error?.message}`
                commit('errorModule/setErrorMessage', errorMessage, { root: true })
            }
        },
    },
    namespaced:true
}