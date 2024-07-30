<template>
    <div v-intersection="()=>action()" class="observer"/>
</template>
<script>
export default {
    name:'observer-block',
    props:{
        action: {
            type: Function,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
.observer{
    width: 100%;
    height: 10px;
    margin-bottom: 1px;
  }
</style>