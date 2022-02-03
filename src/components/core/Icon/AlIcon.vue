<template>
  <i
    class="al-icon"
    :style="{ width: `${$attrs.size}px`, height: `${$attrs.size}px` }"
  >
    <slot> </slot>
  </i>
</template>

<script>
export default {
  name: "AlibabaIcon",
};
</script>

<style>
.al-icon {
  align-items: center;
  display: inline-flex;
  font-feature-settings: "liga";
  justify-content: center;
  vertical-align: middle;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
