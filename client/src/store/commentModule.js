import commentServise from "@/Service/commentServise"


export default {
    state:()=>({
        comments:[]
    }),
    mutations:{
        pushComments(state,value){
            state.comments=[...state.comments,...value]
        },
        unshiftComment(state,value){
            state.comments.unshift(value)
        },
        setComments(state,value){
            state.comments=value
        },
        removeComment(state, commentId){
            state.comments = state.comments.filter(comment => comment._id !== commentId);
        }
    },
    getters:{
        getComments(state){
            return state.comments
        },
    },
    actions:{
        async mountComments({commit},postLink){
            try {
                const { data: commentsData }= await commentServise.fetchComments(postLink,0)
                commit('setComments', commentsData)
            } catch (error) {
                const errorMessage = `Ошибка загрузки коментариев: ${error?.response?.data?.message || error?.message}`
                commit('errorModule/setErrorMessage', errorMessage, { root: true })
            }
        },

        async fetchComments({commit,state},postLink){
            try {
                const { data: commentsData } = await commentServise.fetchComments(postLink,state.comments.length)
                commit('pushComments', commentsData)
            } catch (error) {
                const errorMessage = `Ошибка загрузки коментариев: ${error?.response?.data?.message || error?.message}`
                commit('errorModule/setErrorMessage', errorMessage, { root: true })
            }
        },

        async createNewComment({commit}, newComment){
            try{
                if(newComment.commentText){
                    const  { data: newCommentData }=await commentServise.createNewComment(newComment)
                    commit('unshiftComment', newCommentData)
                }
            } catch (error) {
                const errorMessage = `Ошибка создания нового коментария: ${error?.response?.data?.message || error?.message}`
                commit('errorModule/setErrorMessage', errorMessage, { root: true })
            }
        },

        async removeComment({commit},_id){
            try {
              await commentServise.removeComment(_id)
              commit('removeComment', _id)
            } catch (error) {
                const errorMessage = `Ошибка удаления коментария: ${error?.response?.data?.message || error?.message}`
                commit('errorModule/setErrorMessage', errorMessage, { root: true })
            }
          }
    },
    namespaced:true
}