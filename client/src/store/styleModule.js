import StyleService from "@/Service/styleService"

export default {
    state:()=>({
        editCurrentCategory:{
            selectedCategory:'',
            mainColor:'#f0f0f0',
            secondСolor:'#92000A'
        },
        currentStyle:{
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
        setCurrentStyle(state,value){state.currentStyle=value},
        setDefaultStyle(state){state.currentStyle=state.defaultStyle}
    },
    getters:{
        getEditCategory(state){ return state.editCurrentCategory},
        getSelectedCategory(state){ return state.editCurrentCategory.selectedCategory},
        getCurrentStyle(state){ return state.currentStyle}
    },
    actions:{
        async loadStyleCategory({commit,state},category){
            try {
                if(category){
                    const { data: styleCategoty } = await StyleService.getStyle(category)
                    commit('setCurrentStyle', styleCategoty)
                }else{
                    commit('setCurrentStyle', state.defaultStyle)
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
        modificationColor({ state }, shift = 25) {
            const hexToRGB = (hex) => [
                parseInt(hex.slice(1, 3), 16),
                parseInt(hex.slice(3, 5), 16),
                parseInt(hex.slice(5, 7), 16)
            ]
        
            const rgbToHex = (r, g, b) => `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
        
            const clamp = (value) => Math.max(0, Math.min(255, value))
        
            const [r, g, b] = hexToRGB(state.currentStyle.secondСolor)
        
            const newR = clamp(r - shift)
            const newG = clamp(g - shift)
            const newB = clamp(b - shift)
        
            return rgbToHex(newR, newG, newB)
        }
        
    },
    namespaced:true
}