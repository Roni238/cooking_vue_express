<template>
    <div class="dark">
        <div class="popup">
            <h2>Хотите удалить "
                {{ getSelectObj?.title }} 
                {{ getSelectObj?.name }} 
                {{ getSelectObj?.categoryName }} 
                {{ getSelectObj?.commentText }}
                "
                <!-- {{ deleteObj?.commentText.length<100? deleteObj?.commentText :deleteObj?.commentText.substr(0, 100)+'...' }}? -->
            </h2>
            <span>
                <button @click="this.$store.commit('setShowDeletePopup',false)">Нет</button>

                <button @click="deleteSelectObj">
                    Да
                </button>
    
                
            </span>
        </div>
    </div>
    
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name:'delete-popup',
    computed:{
    ...mapGetters({
      getSelectObj:'getSelectObj',
      getSelectedAction:'getSelectedAction'
    })
  },
  methods:{
    deleteSelectObj(){
        this.$store.dispatch(this.getSelectedAction, this.getSelectObj._id || this.getSelectObj.email)
        this.$store.commit('setShowDeletePopup',false)
    }
  }
}
</script>
<style scoped lang="scss">
    .dark{
        position: fixed;
        top: 0%;
        right: 0px;
        height: 100%;
        width: 100%;
        background: #00000073;
        z-index: 100;
        display: flex;
        align-items: center;
        display: flex;
        justify-content: center;
    }
    h2{
        overflow: hidden;
    }
    .popup{
        justify-content: center;
        flex-direction: column;
        max-height: 70%;
        padding: 20px;
        margin: 20px;
        border-radius: 20px;
        background-color: $second-color;
        overflow: hidden;
        color:$main-color;
        display: flex;
        text-align: center;
    }
    span{
        justify-content: space-around;
        display: flex;
        margin: 20px 0px;
    }
    img{
        width:100%;
        height: 100%;
    }
    
    button{
        margin: auto;
        margin-top: 20px;
        padding: 10px 35px ;
        border-radius: 15px;
        color: $second-color;
        background: $main-color;
    }
</style>