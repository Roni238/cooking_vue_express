<template>
    <div>
        <input type="text" v-model.trim="text" placeholder="Пункт..."/>
        <button @click="create">+</button>
    </div>
</template>
<script>
export default {
    name:'add-item-list',
    props:{
        mutationPost:{
            type:String,
            required:true
        }
    },
    data() {
        return {
            text:''
        }
    },
    methods:{
        create(){
            if(this.text){
                this.$store.commit('newPostModule/'+this.mutationPost, this.text)
                this.text=''
            } 
        }
    }
}
</script>
<style lang="scss" scoped>
    div{
        display: flex;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }
    input{
        width: 100%;
        height: 30px;
        box-sizing: border-box;
        padding: 5px 10px;
        border: none;
        background: none;
        font-size: 20px;
        &::placeholder{
            color: gray;
          }
    }
    button{
        width: 30px;
        height: 30px;
        box-sizing: border-box;
        background: rgb(146, 0, 10);
        border: none;
        font-size: 20px;
        border-radius: 0px 10px 10px 0px;
        color:$main-color;
    }

</style>