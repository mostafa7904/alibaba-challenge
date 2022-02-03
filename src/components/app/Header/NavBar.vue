<template>
  <nav class="navbar d-flex align-center justify-between px-3 sm:px-6 md:px-14">
    <h1 class="font-bold text-lg">Where in the world?</h1>
    <al-btn text @click="toggleTheme()">
      <al-icon class="mr-2" size="19">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"
          />
        </svg>
      </al-icon>
      <span class="text-sm font-bold"> Dark mode </span>
    </al-btn>
  </nav>
</template>

<script>
import AlBtn from "../../core/Button/AlBtn.vue";
import AlIcon from "../../core/Icon/AlIcon.vue";

export default {
  name: "NavBar",
  components: { AlBtn, AlIcon },
  methods: {
    toggleTheme() {
      this.$emit("toggle-theme");
    },
  },
};
</script>
