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
    background-color: var(--category-second-color);
    display: flex;
    border-radius: 12px;
    flex-direction: column;
    padding: 20px 25px;
}
form:deep(){
    h4{
        margin: 10px 0px 5px 0px;
        color: var(--category-main-color);
    }
    button{
        border: none;
        border-radius: 5px;
        background: var(--category-main-color);
        align-self: center;
        padding: 10px 17px;
        font-size: 1.1rem;
        margin-top: 20px;
        color: var(--category-second-color);
        cursor: pointer;
    }
    input{ 
        color: var(--category-second-color);
        border: none;
        border-radius: 5px;
        background: var(--category-main-color);
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