<template>
    <form-styled>
        <h3>{{errorMessage}}</h3>
        <h4>Почта</h4> 
        <input type="text" v-model.trim="data.email" required>

        <h4>Пароль</h4> 
        <password-input v-model:password="data.password"/>
    
        <button @click="login">Войти</button>
    </form-styled>
</template>
<script>


export default {
    name:'login-form',
    data() {
        return {
            data:{
                email:'',
                password:'',
            },
            errorMessage:'',
        }
    },
    methods:{
        async login(){
            const error = await this.$store.dispatch('userModule/login', this.data)
            this.errorMessage=error
            if(!this.errorMessage){
                this.$router.push('/')
            }
        }
    }
}
</script>
