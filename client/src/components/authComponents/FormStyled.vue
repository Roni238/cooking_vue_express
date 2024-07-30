<template >
    <form @submit.prevent>
        <slot></slot>
    </form>
</template>
<script>
export default {
    name:'form-styled'
}
</script>
<style scoped lang="scss">
form{
    width: 80%;
    margin: auto;
    background-color: $second-color;
    display: flex;
    border-radius: 12px;
    flex-direction: column;
    padding: 20px 25px;
}
form:deep(){
    h4{
        margin: 10px 0px 5px 0px;
        color: $main-color;
    }
    button{
        border: none;
        border-radius: 5px;
        background: $main-color;
        align-self: center;
        padding: 10px 17px;
        font-size: 1.1rem;
        margin-top: 20px;
        color: $second-color;
        cursor: pointer;
    }
    input{ 
        color: $second-color;
        border: none;
        border-radius: 5px;
        background: $main-color;
        padding: 7px;
        font-size: 1.1rem;
        width: 100%;
    }
    label {
        display: flex;
        align-items: center;
        position: relative;
    }
    .password-control{
        position: absolute;
        height: 30px;
        width: 30px;
        right: 5px;
    }
}
</style>