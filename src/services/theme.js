class Theme {
  constructor(theme) {
    this._theme = theme;
  }

  get theme() {
    return this._theme || window.localStorage.getItem("theme") || "light";
  }

  set theme(newTheme) {
    this._theme = newTheme;
    this.saveTheme();
  }

  /**
   *
   * @description Saves the passed theme in localStorage
   *
   */
  saveTheme() {
    window.localStorage.setItem("theme", this.theme);
  }

  /**
   *
   * @param {('dark'|'light')} theme This is the value of the new theme to be set on the document.
   * @description Toggles the document theme by setting a class on the root element
   *
   */
  setTheme(theme) {
    if (document.documentElement && document.documentElement.classList) {
      theme == "light"
        ? document.documentElement.classList.remove("theme-dark")
        : document.documentElement.classList.add("theme-dark");
    }
    this.theme = theme;
  }

  /**
   *
   * @description Toggles the document theme by setting a class on the root element
   *
   */
  toggleTheme() {
    if (this.theme == "dark") {
      this.setTheme("light");
    } else {
      this.setTheme("dark");
    }
  }
}

export default Theme;
