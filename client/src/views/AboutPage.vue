<template>
  <div>
    <h2>О нас</h2>
    
    <a href="https://github.com/Roni238">Github</a>
    <a href="mailto:ak4932328@gmail.com">Почта</a>
    <a href="https://t.me/Roni238000000">Телеграм</a>
  </div>
</template>
<style lang="scss" scoped>
  div{
    padding: 10px 20px;

    h2{
      margin: 10px 0px;
    }

    a{
      display: block;
      margin: 5px 10px;
    }
  }
</style>
<script>
export default {
  mounted(){
    this.$store.dispatch('styleModule/resetStyle')
  },
}
</script>
