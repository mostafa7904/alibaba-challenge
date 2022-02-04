<template>
  <div>
    <div class="d-flex flex-column sm:flex-row justify-between">
      <al-input
        elevated
        type="search"
        min-width="30%"
        placeholder="Search for a country..."
        v-model="searchTerm"
      />

      <al-select
        min-width="150px"
        max-width="180px"
        v-model="filter"
        elevated
        :items="continents"
        @input="filterByContinent"
        class="mt-4 sm:mt-0"
        placeholder="Filter by region"
      />
    </div>

    <div
      class="d-grid grid-col-1 sm:grid-col-2 md:grid-col-3 lg:grid-col-4 gap-5 md:gap-18 mt-12"
      v-if="!loading"
    >
      <country-card
        v-for="(country, index) in countries"
        :key="index"
        :country="country"
      />
    </div>
    <al-loading v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AlInput from "../components/core/Input/AlInput.vue";
import CountryCard from "../components/app/Home/CountryCard.vue";
import AlSelect from "../components/core/Select/AlSelect.vue";
import AlLoading from "../components/core/Loading/AlLoading.vue";

export default {
  name: "Home",
  components: { AlInput, CountryCard, AlSelect, AlLoading },
  data: () => ({
    searchTerm: null,
    loading: false,
    continents: ["All", "Africa", "America", "Asia", "Europe", "Oceania"],
    filter: null,
  }),
  computed: {
    ...mapGetters({
      countries: "api/countries",
    }),
  },
  watch: {
    searchTerm(value) {
      this.getCountries(value);
    },
  },
  async mounted() {
    await this.getCountries();
  },
  methods: {
    /**
     *
     * @async
     * @param {String} [search]
     * @param {String} [filter]
     * @description This function will get all the countries based on the params passed to it
     * If the search param is passed it will search through the country names for the passed string
     * If the filter param is passed it will filter the countries based on the filter
     * If no param is passed then it will get all countries
     *
     */
    async getCountries(search, filter) {
      try {
        this.loading = true;

        // Let the dom update
        await this.$nextTick();
        if (search) await this.search(search);
        else await this.getAllCountries(filter);
      } finally {
        this.loading = false;
      }
    },
    async filterByContinent(continent) {
      // If it's all then there are no filters
      if (continent == "All") {
        await this.getCountries();
        return;
      }
      await this.getCountries(null, {
        type: "continent",
        value: continent.toLowerCase(),
      });
    },
    ...mapActions({
      getAllCountries: "api/getAllCountries",
      search: "search/searchLocal",
    }),
  },
};
</script>

<style lang="scss">
@use "@/scss/pages/home.scss";
</style>
