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
        :multiple="false"
        class="mt-4 sm:mt-0"
        placeholder="Filter by region"
      />
    </div>

    <div
      class="d-grid grid-col-1 sm:grid-col-2 md:grid-col-3 lg:grid-col-4 gap-4 md:gap-12 mt-12"
      v-if="!loading"
    >
      <country-card
        v-for="(country, index) in countries"
        :key="index"
        :country="country"
      />
    </div>
    <div class="text-center font-bold text-lg mt-6" v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AlInput from "../components/core/Input/AlInput.vue";
import CountryCard from "../components/app/Home/CountryCard.vue";
import AlSelect from "../components/core/Select/AlSelect.vue";

export default {
  name: "Home",
  components: { AlInput, CountryCard, AlSelect },
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
      console.log(value);
    },
  },
  async mounted() {
    try {
      this.loading = true;
      await this.getAllCountries();
    } finally {
      this.loading = false;
    }
  },
  methods: mapActions("api", ["getAllCountries"]),
};
</script>

<style lang="scss">
@use "@/scss/pages/home.scss";
</style>
