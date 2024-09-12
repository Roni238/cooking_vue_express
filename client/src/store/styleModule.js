import StyleService from "@/Service/styleService"

export default {
    state:()=>({
        editCurrentCategory:{
            selectedCategory:'',
            mainColor:'#f0f0f0',
            secondСolor:'#92000A'
        },
        defaultStyle:{
            mainColor:'#f0f0f0',
            secondСolor:'#92000A',
        }
    }),
    mutations:{
        setSelectedCategory(state,value){state.editCurrentCategory.selectedCategory=value},
        setMainColor(state,value){state.editCurrentCategory.mainColor=value},
        setSecondСolor(state,value){state.editCurrentCategory.secondСolor=value},
        setDefaultStyle(state){state.currentStyle=state.defaultStyle}
    },
    getters:{
        getEditCategory(state){ return state.editCurrentCategory},
        getSelectedCategory(state){ return state.editCurrentCategory.selectedCategory},
    },
    actions:{
        resetStyle(){
            const defaultMainColor = getComputedStyle(document.documentElement).getPropertyValue('--default-main-color').trim()
            const defaultSecondColor = getComputedStyle(document.documentElement).getPropertyValue('--default-second-color').trim()
            document.documentElement.style.setProperty('--category-main-color', defaultMainColor)
            document.documentElement.style.setProperty('--category-second-color', defaultSecondColor)
        },
        async loadStyleCategory({dispatch}, category){
            try {
                if(category){
                    const { data: styleCategoty } = await StyleService.getStyle(category)
                    document.documentElement.style.setProperty('--category-main-color', styleCategoty.mainColor)
                    document.documentElement.style.setProperty('--category-second-color', styleCategoty.secondСolor)
                    document.documentElement.style.setProperty('--modification-color', styleCategoty.accentColor)
                }else{
                    dispatch('resetStyle')
                }
            } catch (error) {
                alert('Отсудствует подлючение', error)
            } 
        },
        async styleEdit({state}){
            try {
                if(state.editCurrentCategory.selectedCategory){
                    await StyleService.styleEdit(state.editCurrentCategory)
                    alert('Стили применены')
                }   
            } catch (error) {
                alert('Отсудствует подлючение', error)
            } 
        },
        // modificationColor({ commit }, shift = 25) {
        //     const secondColor = getComputedStyle(document.documentElement).getPropertyValue('--category-second-color').trim()
            
        //     const [r, g, b] = [
        //       parseInt(secondColor.slice(1, 3), 16),
        //       parseInt(secondColor.slice(3, 5), 16),
        //       parseInt(secondColor.slice(5, 7), 16)   
        //     ]

        //     const clamp = (value) => Math.max(0, Math.min(255, value))

        //     const newR = clamp(r - shift)
        //     const newG = clamp(g - shift)
        //     const newB = clamp(b - shift)

        //     const rgbToHex = (r, g, b) => {
        //         const toHex = (value) => value.toString(16).padStart(2, '0')
        //         return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
        //     }
        //     document.documentElement.style.setProperty('--modification-color', rgbToHex(newR, newG, newB))
        //     // return rgbToHex(newR, newG, newB)
        //   }
          
    },
    namespaced:true
}