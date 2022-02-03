<template>
  <button class="al-btn" v-bind="$attrs" @click="$emit('click')">
    <div class="al-btn__content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: "AlibabaButton",
};
</script>

<style lang="scss">
.al-btn {
  cursor: pointer;
  text-align: center;
  padding: unset;
  max-height: 35px;
  min-height: 35px;
}

.al-btn__content {
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1 0 auto;
  justify-content: inherit;
  position: relative;
}

.al-btn[text] {
  color: inherit;
  background: none;
  border: none;
}
</style>
