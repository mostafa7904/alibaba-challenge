import axios from "axios";
import config from "../static/api.json";

const state = () => ({
  countries: [],
  country: {},
});

const mutations = {
  SET_COUNTRIES(state, payload) {
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
  async getAllCountries({ commit }, filter) {
    try {
      const filters = {
        all: "ALL",
        continent: "SEARCH_BY_CONTINENT",
      };
      console.log(filter);

      let url = `${config.BASE_URL}`;
      // If a filter exsits then move to that route
      if (filter && filter.type in filters) {
        url += config.routes[filters[filter.type]];
        url += filter.value;
      }
      // Default to all
      else {
        url += config.routes.ALL;
      }

      // All the fields we need
      url += `?${config.queries.FIELDS}`;
      const fields = ["CAPITAL", "NAME", "POPULATION", "REGION", "FLAGS"];

      // Add fields to the url
      fields.forEach((field) => {
        url += config.fields[field];
        url += ",";
      });

      // Send the request
      const res = await axios.get(url);
      // If there is data set it in state + return it
      if (res.data) commit("SET_COUNTRIES", res.data);
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
      let url = `${config.BASE_URL}`;

      // This means it's the alpha code
      if (country.length == 3) {
        url += `${config.routes.SEARCH_BY_ALPHA}`;
      } else {
        url += `${config.routes.SEARCH_BY_NAME}`;
      }

      url += `${country}/?${config.queries.FIELDS}`;

      // All the fields we need
      const fields = [
        "CAPITAL",
        "NAME",
        "SUB_REGION",
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
      if (res.data) {
        if (res.data.length) {
          commit("SET_COUNTRY", res.data[0]);
          return res.data[0];
        } else {
          commit("SET_COUNTRY", res.data);
          return res.data;
        }
      }
      return false;
    } catch (e) {
      console.warn("Error in getting the country's detail!");
      console.info("store/index/getCountryDetail");
      console.error(e);
      return false;
    }
  },
};
const getters = {
  countries(state) {
    return state.countries.map((country) => {
      return {
        ...country,
        flag:
          country.name == "Afghanistan"
            ? require("@/assets/afghanistan.png")
            : country.flags.png,
      };
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
