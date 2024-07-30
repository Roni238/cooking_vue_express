<template>
    <div>
       <input type="file" @change="onFileSelected" accept="image/*" id="input__file" required/>

        <label for="input__file">
            <span v-if="!selectedFileData">Выберите файл</span>
            <img v-else :src="imagePreview"/>
        </label> 
    </div>
</template>
<script>
export default {
    data(){
        return{
            selectedFileData:null,
            imagePreview:null
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFileData=event.target.files[0]
            this.$store.commit('newPostModule/setImage', this.selectedFileData)

            if(this.selectedFileData){
                const reader  = new FileReader()
                reader.onload=()=>this.imagePreview = reader.result
                reader.readAsDataURL(this.selectedFileData)
            }
        }
    },
    name:'upload-image'
}
</script>
<style scoped lang="scss">
    div{
       background-color: rgba(0, 0, 0, 0.1); 
       border-radius: 10px;
       min-height: 200px;
    }
    img{
        width: 100%;
        height: 100%;
    }
    input{
        opacity: 0;
        visibility: hidden;
        position: absolute;
        
        &::placeholder{
            color: gray;
        }
    }
    label {
        height: 100%;
        width: 100%;
        font-size: 1.125rem;
        font-weight: 700;
        display: flex;
        justify-content: center;
        cursor: pointer;
        align-items: center;
        color: gray;

        img{
            border-radius: 10px;
        }
    }
</style>