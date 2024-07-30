<template>
    <div>
        <label for="password" v-if="hidePassword">
            <input type="password" v-model.trim="password" required @input="emitPassword">

            <hide-password-icon @click="this.hidePassword=false"/>
        </label> 

        <label for="password" v-else>
            <input type="text" v-model.trim="password" required @input="emitPassword">

            <show-password-icon @click="this.hidePassword=true"/>
        </label>
    </div>
</template>
<script>
export default {
    data(){
        return {
            hidePassword:true,
            password:''
        }
    },
    methods: {
        emitPassword() {
            this.$emit('update:password', this.password)
        }
    },
    name:'password-input'
}
</script>
