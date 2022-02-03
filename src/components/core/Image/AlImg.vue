<template>
  <img
    class="al-img"
    loading="lazy"
    :style="{
      maxWidth: $attrs['max-width'],
      width: $attrs.width,
      height: $attrs.height,
      maxHeight: $attrs['max-height'],
      minHeight: $attrs['min-height'],
    }"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  name: "AlibabaImage",
};
</script>

<style>
.al-img {
  display: inline-block;
  object-fit: cover;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.al-img[contain] {
  object-fit: contain;
}
</style>
