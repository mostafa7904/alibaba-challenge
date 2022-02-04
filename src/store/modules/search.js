import { createSearchRegex } from "../../services/regex";

const state = () => ({
  cachedSearch: {},
});

const mutations = {
  SET_VALUE_IN_CACHE(state, { key, value }) {
    state.cachedSearch[key] = value;
  },
  CLEAR_CACHE(state) {
    state.cachedSearch = {};
  },
};

const actions = {
  /**
   *
   * @param {String} searchTerm The search text
   * @description Will search the local stored countries array.
   * @description This action will
   * @description Named lcoalsearch cause we might want to add a online search that uses the api
   * @returns {Array} Array of the found result
   *
   */
  searchLocal({ rootState, state, commit }, searchTerm) {
    // Search the cache first
    if (searchTerm in state.cachedSearch) {
      commit("api/SET_COUNTRIES", state.cachedSearch[searchTerm], {
        root: true,
      });
      return state.cachedSearch[searchTerm];
    }
    // If not in the cache then run a loop
    const localResult = rootState.api.countries.filter((country) => {
      return createSearchRegex(country.name).test(searchTerm);
    });

    // If the cache was greater than 100 saved result then clear it so we don't break the performance
    if (Object.keys(state.cachedSearch).length >= 100) {
      commit("CLEAR_CACHE");
    }

    // Save the search in cache
    commit("SET_VALUE_IN_CACHE", { key: searchTerm, value: localResult });
    commit("api/SET_COUNTRIES", localResult, { root: true });

    return localResult;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
