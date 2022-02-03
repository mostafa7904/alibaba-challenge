import Vue from "vue";
import Vuex, { createLogger } from "vuex";
import apiModule from "./modules/api";
import searchModule from "./modules/search";

Vue.use(Vuex);

const isDev = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: { api: apiModule, search: searchModule },
  strict: isDev,
  plugins: isDev ? [createLogger()] : [],
});
