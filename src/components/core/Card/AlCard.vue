<template>
  <div
    v-bind="$attrs"
    :role="link ? 'link' : 'listitem'"
    @click="cardClick"
    class="al-card"
    :style="{ maxWidth: $attrs['max-width'], width: $attrs.width }"
  >
    <slot name="image"> </slot>

    <div class="al-card__content">
      <div class="al-card__title">
        <slot name="title"> </slot>
      </div>
      <div class="al-card__text">
        <slot name="text"> </slot>
      </div>
    </div>

    <!-- Footer and subtitle seems unnecessary in this project -->
  </div>
</template>

<script>
export default {
  name: "AlibabaCard",
  props: {
    link: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: "#",
    },
  },
  methods: {
    cardClick() {
      if (this.link) {
        this.$router.push({
          path: this.to,
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/variables";

.al-card {
  position: relative;
  display: block;
  border-width: thin;
  max-width: 100%;
  outline: none;
  text-decoration: none;
  word-wrap: break-word;
  white-space: normal;
  background-color: var(--al-bg-secondary);
}

.al-card[role="link"] {
  cursor: pointer;
}

.al-card[elevated] {
  box-shadow: $shadow-md;
  -webkit-box-shadow: $shadow-md;
  -moz-box-shadow: $shadow-md;
}
.al-card[rounded] {
  border-top-left-radius: $rounded-md;
  border-top-right-radius: $rounded-md;
  border-bottom-right-radius: $rounded-md;
  border-bottom-left-radius: $rounded-md;
}
.al-card__title {
  display: flex;
  position: relative;
  align-items: center;
  flex-wrap: wrap;
  font-size: $font-md;
  font-weight: $font-bold;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: keep-all;
}
.al-card__content {
  padding: {
    top: 20px;
    left: 25px;
    right: 25px;
    bottom: 45px;
  }
}
</style>
