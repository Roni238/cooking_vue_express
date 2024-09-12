import AuthService from "@/Service/AuthService"
import axios from 'axios';
import {API_URL} from "../http/$api-json";

export default {
    state:()=>({
        user:{},
        errorMessage:''
    }),
    mutations:{
        setUser(state,user){ state.user = user },
        setErrorMessage(state,errorMessage){ state.errorMessage = errorMessage },
    },
    getters:{
        getName(state){ return state.name },
        getUser(state){ return state.user },
        getRole(state){ return state.user?.role },
        getIsActivated(state){ return state.user?.isActivated }
    },
    actions:{
        async login({commit},loginData){
            try {
                const {email, password} = loginData              
                const { data : userData } = await  AuthService.login(email,password)
                localStorage.setItem('token', userData.accessToken)

                commit('setUser', userData.user)
            } catch (error) {
                return error.response?.data?.message
            }
        },
        async registration({commit},registrationData){
            try {
                const {email,password,name} = registrationData
                const { data: userData } = await  AuthService.registration(email,password,name)
                if( password.lenght < 7 ){
                    commit('setErrorMessage','Пароль должен быть не короче 7')
                }
                localStorage.setItem('token', userData.accessToken)
                commit('setUser', userData.user)
                window.location.href = process.env.VUE_APP_CLIENT_URL
            } catch (error) {
                return error.response?.data?.message
            }
        },
        async logout({commit}){
            try {
                await AuthService.logout()
                localStorage.removeItem("token")
                commit('setUser', {})
            } catch (error) {
                console.log(error.response?.data?.message)
            }
        },
        async checkAuth({commit}){
            try {
                const { data: userData } = await axios.get(`${API_URL}/refresh`, {withCredentials:true})
                // console.log(`${API_URL}refresh`)
                localStorage.setItem('token', userData.accessToken)
                commit('setUser', userData.user)
            } catch (error) {
                console.log(error)
            }
        }
    },
    namespaced:true
}