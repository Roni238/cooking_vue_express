import CategoryService from "@/Service/categoryService"

export default {
    state:()=>({
        categories:[],
        searchCategoryQuery:'',
        editMode:false,
        newCategoryName:''
    }),
    mutations:{
        setCategories(state,value){
          state.categories=value
        },
        pushCategories(state,value){
          state.categories.push(value)
        },
        setNewCategoryName(state,value){
          state.newCategoryName=value
        },
        setSearchCategoryQuery(state,value){
          state.searchCategoryQuery=value
        },
        setEditMode(state){
          state.editMode=!state.editMode
        }
    },
    getters:{
        getCategories(state){
          return state.categories
        },
        getSearchedCategories(state) {
          return state.categories.filter(category => category.categoryName.toLowerCase().includes(state.searchCategoryQuery.toLowerCase()))
        },
        getEditMode(state){
          return state.editMode
        },
    },
    actions:{
        async loadCategories({commit}){
          try{
            const {data:categoriesData} = await CategoryService.loadCategories()
            commit('setCategories', categoriesData)
          } catch (error) {
            const errorMessage = `Ошибка загрузки категорий: ${error}`
            commit('errorModule/setErrorMessage', errorMessage, { root: true })
          }  
        },

        async CreateNewCategories({commit}, newCategory){
          try {
            const { data: categoriyData } = await CategoryService.createNewCategories(newCategory)
            commit('pushCategories', categoriyData.newCategory)
            commit('setNewCategoryName', '')
          }catch (error) {
            const errorMessage = `Ошибка создания новой категории: ${error?.response?.data?.message || error?.message}`
            commit('errorModule/setErrorMessage', errorMessage, { root: true })
          }
        },

        async editCategory({state, commit},selectedCategory){
          try {
            if(selectedCategory.categoryName==state.newCategoryName || !state.newCategoryName){
              throw new Error('Имя категории не изменено')
            }
            
            const { data:changedCategory } = await CategoryService.editCategory(selectedCategory._id, state.newCategoryName)

            selectedCategory.categoryName=changedCategory.categoryName
            selectedCategory.categoryLink=changedCategory.categoryLink
          } catch (error) {
            const errorMessage = `Ошибка изменения категории: ${error?.response?.data?.message || error?.message}`
            commit('errorModule/setErrorMessage', errorMessage, { root: true })
          }
        },

        async removeСategory({state, commit},_id){
          try {
            await CategoryService.removeСategory(_id)
            state.categories = state.categories.filter(category =>category._id!==_id)
          } catch (error) {
            const errorMessage = `Ошибка удаления категории: ${error?.response?.data?.message || error?.message}`
            commit('errorModule/setErrorMessage', errorMessage, { root: true })
          }
        }
    },
    namespaced:true
}