import axios from "axios";
import config from "../static/api.json";

const state = () => ({
  countries: [],
});

const mutations = {
  ADD_COUNTRIES(state, payload) {
    state.countries = payload;
  },
};

const actions = {
  /**
   *
   * @async
   * @description This function will send a request to the api and get all countries
   * @returns {Object[]}
   *
   */
  async getAllCountries({ commit }) {
    try {
      const res = await axios.get(
        `${config.BASE_URL}${config.routes.ALL}?${config.queries.FIELDS}${config.fields.CAPITAL},${config.fields.NAME},${config.fields.POPULATION},${config.fields.REGION},${config.fields.FLAGS}`
      );

      if (res.data) commit("ADD_COUNTRIES", res.data);
      return res.data;
    } catch (e) {
      console.warn("Error in getting all countries!");
      console.info("store/index/getAllCountries");
      console.error(e);
      return [];
    }
  },
};
const getters = {
  countries(state) {
    return state.countries.map((country) => {
      country.flag = country.flags.png;
      if (country.name == "Afghanistan") {
        country.flag = require("@/assets/afghanistan.png");
      }
      return country;
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
