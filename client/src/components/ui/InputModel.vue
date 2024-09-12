<template>
    <input :value="modelValue" @input="updateInput">
</template>
<script>
export default {
  name: 'input-model',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
<style scoped lang="scss">

input {
  color: var(--category-second-color);
  background-color: var(--category-main-color);
  outline: none;
  font-size: 20px;
  padding: 5px;
  border-radius: 10px;
  border: none;
  color: black;
  width: 100%; 

  &::placeholder{
    color: gray;
  }
}

</style>