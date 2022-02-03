import Vue from "vue";
import Vuex, { createLogger } from "vuex";
import apiModule from "./modules/api";

Vue.use(Vuex);

const isDev = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: { api: apiModule },
  strict: isDev,
  plugins: isDev ? [createLogger()] : [],
});
