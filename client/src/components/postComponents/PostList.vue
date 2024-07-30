<template>
    <div class="list"> 
        <post-item v-for="post in posts" :post="post" :key="post.id"/>
    </div>  
</template>
<script>
export default {
    name:'post-list',
    props:{
        posts:{
            type:Array
        }
    }
}
</script>
<style lang="scss" scoped>
.list{
    display: grid;
    margin: auto;  
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 10px;
}
@media (max-width: 1110px) {
    .list{
        max-width: 720px;
    }
}
@media (max-width: 750px) {
    .list{
        max-width: 390px;
    }
}
@media (max-width: 380px) {
    .list{
        grid-template-columns: auto;
    }
}
</style>