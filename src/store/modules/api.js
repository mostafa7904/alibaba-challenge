import axios from "axios";
import config from "../static/api.json";

const state = () => ({
  countries: [],
  country: {},
});

const mutations = {
  ADD_COUNTRIES(state, payload) {
    state.countries = payload;
  },
  SET_COUNTRY(state, payload) {
    state.country = payload;
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
      let url = `${config.BASE_URL}${config.routes.ALL}?${config.queries.FIELDS}`;
      // All the fields we need
      const fields = ["CAPITAL", "NAME", "POPULATION", "REGION", "FLAGS"];

      // Add fields to the url
      fields.forEach((field) => {
        url += config.fields[field];
        url += ",";
      });

      // Send the request
      const res = await axios.get(url);
      // If there is data set it in state + return it
      if (res.data) commit("ADD_COUNTRIES", res.data);
      return res.data;
    } catch (e) {
      console.warn("Error in getting all countries!");
      console.info("store/index/getAllCountries");
      console.error(e);
      return [];
    }
  },

  /**
   *
   * @async
   * @param {String} country Name of the country that needs detail
   * @description This function will send a request to the api and get the passed country's name detail
   * @returns {Object}
   *
   */
  async getCountryDetail({ commit }, country) {
    try {
      // Make the url
      let url = `${config.BASE_URL}${config.routes.SEARCH_BY_NAME}${country}?${config.queries.FIELDS}`;

      // All the fields we need
      const fields = [
        "CAPITAL",
        "NAME",
        "REGIONAL_BLOCKS",
        "NATIVE_NAME",
        "POPULATION",
        "REGION",
        "FLAGS",
        "TOP_LEVEL_DOMAIN",
        "CURRENCIES",
        "LANGUAGES",
        "BORDERS",
      ];

      // Add fields to the url
      fields.forEach((field) => {
        url += config.fields[field];
        url += ",";
      });
      // Send the request
      const res = await axios.get(url);

      // If data is available store it + return it
      if (res.data && res.data.length) {
        commit("SET_COUNTRY", res.data[0]);
        return res.data[0];
      }
      return {};
    } catch (e) {
      console.warn("Error in getting the country's detail!");
      console.info("store/index/getCountryDetail");
      console.error(e);
      return {};
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
