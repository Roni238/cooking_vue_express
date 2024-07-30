<template >
    <textarea rows="7" :value="modelValue" @input="updateInput"></textarea>
</template>
<script>
export default {
    name:'textarea-model',
    props: {
        modelValue: [String]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>
<style lang="scss" scoped>
    textarea{
        max-width: 100%;
        width:100%;
        font-size: 20px;
        padding: 7px;
        margin-top: 10px;
        resize: vertical;

        &::placeholder{
            color: gray;
          }
    }
</style>