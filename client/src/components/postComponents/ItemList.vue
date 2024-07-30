<template>
    <ul>
        <li v-for="item in list" :item="item" :key="item" :dispatch='dispatch'>
            <p>{{item}}</p>
            <delete-item-icon @click="this.$store.commit(dispatch, item)"/>
        </li>
    </ul>
</template>
<script>
export default {
    name:'item-list',
    props:{
        list:{
            type:Array,
            required:true
        },
        dispatch:{
            type:String,
            required:true
        }
    }
}
</script>
<style scoped>
    ul{
        list-style: none;
    }
    li{
        font-size: 18px;
        padding: 1px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    svg {
        min-width: 25px;
        min-height: 25px;
        stroke-width: 2;
    }
    p{
        max-width: calc(100% - 35px);
        word-wrap: break-word;
    }
</style>