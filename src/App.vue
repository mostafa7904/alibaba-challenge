<template>
  <div class="" id="app" ref="app">
    <header class="shadow">
      <nav-bar @toggle-theme="onThemeToggle" />
    </header>
    <main class="container px-6 sm:px-6 md:px-14 py-10">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from "./components/app/Header/NavBar.vue";
import ThemeService from "./services/theme";

const themeService = new ThemeService();

export default {
  name: "App",
  components: {
    NavBar,
  },
  mounted() {
    themeService.setTheme(themeService.theme);
  },
  methods: {
    onThemeToggle() {
      themeService.toggleTheme();
    },
  },
};
</script>
