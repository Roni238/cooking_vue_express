<template>
    <svg 
      @click="this.$store.commit('setShowDeletePopup',true)"
       xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 30 30" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
</template>
<script>
export default {
    name:'delete-button',
}
</script>
<style scoped lang="scss">
svg{
    stroke:var(--category-main-color);
    background: var(--category-second-color);
    border-radius: 5px;
    padding: 5px;
    stroke-width: 3;
}
</style>