<template>
    <form-styled>
        <h3>{{errorMessage}}</h3>
        <h4>Почта</h4> 
        <input type="email" v-model.trim="data.email" required>

        <h4>Пароль</h4> 
        <password-input v-model:password="data.password"/>

        <h4>Имя</h4> 
        <input type="text" v-model.trim="data.name" required>

        <button @click="registration">Регистрация</button>

    </form-styled>     
</template>
<script>
export default {
    name:'registration-form',
    data() {
        return {
            data:{
                email:'',
                password:'',
                name:'',
            },
            errorMessage:'',
            hidePassword:true
        }
    },
    methods:{
        async registration(){
            const error = await this.$store.dispatch('userModule/registration', this.data)
            this.errorMessage=error
        }
    }
}
</script>
