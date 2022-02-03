<template>
  <div
    class="al-select__container"
    :ref="_uid"
    @click.stop="toggleMenu"
    v-outside="closeMenu"
    :style="{
      width: $attrs.width,
      minWidth: $attrs['min-width'],
      maxWidth: $attrs['max-width'],
    }"
  >
    <select class="al-select" v-bind="$attrs">
      <option value="">{{ value || placeholder }}</option>
      <!-- <option  :value="option">
        {{ option }}
      </option> -->
    </select>
    <div class="al-select__menu" v-if="isActive">
      <ul class="list-style-none">
        <li
          @click="onInput(option)"
          class="al-select__option"
          v-for="(option, index) in items"
          :key="index"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlibabaSelect",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "Choose an option...",
    },
    value: {
      type: String,
    },
  },

  data: () => ({
    isActive: false,
  }),

  methods: {
    onInput(option) {
      this.$emit("input", option);
    },
    openMenu() {
      this.isActive = true;
    },
    closeMenu() {
      this.isActive = false;
    },
    toggleMenu() {
      if (this.isActive) this.closeMenu();
      else this.openMenu();
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/variables";

$select-height: 50px;
$select-menu-margin: 5px;

.al-select__container {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--al-bg-secondary);
  height: $select-height;
  padding: 5px 25px;
  border-radius: 5px;
  cursor: pointer;
}

.al-select {
  pointer-events: none;
  &::placeholder {
    font-size: $font-sm;
    color: var(--al-text-primary);
    user-select: none;
  }
  position: relative;
  cursor: pointer;
  font-size: $font-sm;
  color: var(--al-text-primary);
  caret-color: var(--al-text-primary);
  border: none;
  background: none;
  width: 100%;
  height: 100%;
}

.al-select__container[elevated] {
  box-shadow: $shadow;
  -webkit-box-shadow: $shadow;
  -moz-box-shadow: $shadow;
}

.al-select__menu {
  border-radius: inherit;
  position: absolute;
  top: calc($select-height + $select-menu-margin);
  left: 50%;
  transform: translateX(-50%);
  background: var(--al-bg-secondary);
  width: 100%;
  z-index: 9999;
  padding: 10px 15px;
  box-shadow: $shadow-lg;
  -webkit-box-shadow: $shadow-lg;
  -moz-box-shadow: $shadow-lg;
}
.al-select__option {
  font-size: 14px;
  padding: 8px;
  border-radius: 5px;
  &:hover {
    background: rgba($color: #000000, $alpha: 0.15);
  }
}
</style>
