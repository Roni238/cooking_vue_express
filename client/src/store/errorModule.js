export default {
    state:()=>({
        errorMessage:''
    }),
    getters:{
        getErrorMessage(state){
            return state.errorMessage
        }
    },
    mutations:{
        setErrorMessage(state, error){
            state.errorMessage = error
            console.error(error)
            setTimeout(()=>{state.errorMessage=''},10000)
        }
    },
    namespaced:true
}