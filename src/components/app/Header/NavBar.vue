<template>
  <nav class="navbar d-flex align-center justify-between px-3 sm:px-6 md:px-14">
    <router-link to="/">
      <h1 class="font-bold text-lg">Where in the world?</h1>
    </router-link>
    <al-btn text @click="toggleTheme()">
      <al-icon class="mr-2" size="19">
        <moon />
      </al-icon>
      <span class="text-sm font-bold"> Dark mode </span>
    </al-btn>
  </nav>
</template>

<script>
import AlBtn from "../../core/Button/AlBtn.vue";
import AlIcon from "../../core/Icon/AlIcon.vue";
import Moon from "../Icons/Moon.vue";

export default {
  name: "NavBar",
  components: { AlBtn, AlIcon, Moon },
  methods: {
    toggleTheme() {
      this.$emit("toggle-theme");
    },
  },
};
</script>
