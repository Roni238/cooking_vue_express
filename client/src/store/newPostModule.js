import PostService from "@/Service/postService"

export default {
    state:()=>({
        newPost:{
            title:'',
            category:'',
            components:[],
            description:'',
            recipe:[],
        },
        newPostImage:null,
    }),
    mutations:{
        setNewPostTitle(state,value){
            state.newPost.title=value
        },
        setNewPostDescription(state,value){
            state.newPost.description=value
        },
        setNewPostCategory(state,value){
            state.newPost.category=value
        },
        setImage(state,value){
            state.newPostImage=value
        },
        pushComponents(state,value){
            state.newPost.components.push(value)
        },
        pushRecipe(state,value){
            state.newPost.recipe.push(value)
        },
        deleteComponent(state,value){
            state.newPost.components=state.newPost.components.filter(component=>component!=value)
        },
        deleteRecipeParagraph(state,value){
            state.newPost.recipe=state.newPost.recipe.filter(paragraph=>paragraph!=value)
        },
        resetNewPost(state){
            state.newPost.title=''
            state.newPost.category=''
            state.newPost.components=[]
            state.newPost.description=''
            state.newPost.recipe=''
            state.newPostImage=null
        }
    },
    getters:{
        getComponents(state){
            return state.newPost.components
        },
        getRecipe(state){
            return state.newPost.recipe
        }
    },
    actions:{
        async createNewPost({state, commit}){
            try {
                const { title, description, category } = state.newPost;
                if (!title.trim()) throw new Error('Название не может быть пустым')
                if (!description.trim()) throw new Error('Заполните описание')
                if (!category.trim()) throw new Error('Укажите категорию')
                if (!state.newPostImage) throw new Error('Добавьте фото')

                const { data: newPostData } = await PostService.createNewPost(state.newPost)
                const formData = new FormData()
                formData.append('image', state.newPostImage, state.newPostImage.name)
                formData.append('post', newPostData._id)
                await PostService.addImage(formData)

                commit('postModule/pushPost', newPostData , { root: true })
                commit('resetNewPost')

                return newPostData.link
            } catch (error) {
                const errorMessage = `Ошибка создания поста: ${error?.response?.data?.message || error?.message}`
                commit('errorModule/setErrorMessage', errorMessage, { root: true })
            }
        }
    },
    namespaced:true
}