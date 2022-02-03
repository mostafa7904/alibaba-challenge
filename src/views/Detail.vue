<template>
  <div class="detail-page">
    <al-btn class="text-sm back-btn" @click="goBack()">
      <al-icon size="18" class="mr-3">
        <chevron-left class="back-icon" />
      </al-icon>
      Back
    </al-btn>

    <div
      v-if="!loading"
      class="d-grid grid-col-1 sm:grid-col-2 details-container gap-4 sm:gap-12"
    >
      <div class="sm:mr-20">
        <al-img
          width="100%"
          max-height="350px"
          :src="
            country.name == 'Afghanistan'
              ? require('@/assets/afghanistan.png')
              : country.flags.png
          "
        />
      </div>

      <!-- Detail section -->
      <!-- What's happening here is we're looping through sections in fields object (look in data) -->
      <!-- Each section has it's own fields. for example basic section has nativeName and etc. -->
      <!-- Each field is made up of some properties like title and field -->
      <!-- Title being the value that is shown on the website as the property owner. example: Native name, Top Level Domain, etc. -->
      <!-- There can also be other properties like subField which hints that 
           there is another object within the current object with another key.
           If this is present the value shown on site will be the value of the key "subField"  
      -->
      <!-- Presenter property hints that the value needs to go through a filter -->
      <div>
        <div class="country-name mt-5 md:mt-0">{{ country.name }}</div>

        <div class="d-grid grid-col-1 md:grid-col-2 mt-0 md:mt-5">
          <ul
            v-for="(field, key) of fields"
            :key="key"
            class="list-style-none mt-6 md:mt-0"
          >
            <li
              class="mt-2 text-sm"
              v-for="(item, index) in field"
              :key="index"
            >
              <span class="font-semibold mr-2">{{ item.title }}:</span>
              <span v-if="typeof country[item.field] == 'object'">
                <span v-for="(subItem, idx) in country[item.field]" :key="idx"
                  >{{ subItem[item.subField] || subItem
                  }}{{ idx == country[item.field].length - 1 ? "" : "," }}
                </span>
              </span>

              <template v-else>
                <span v-if="item.presenter">{{
                  country[item.field] | prettyNumbers
                }}</span>
                <span v-else>{{ country[item.field] }}</span>
              </template>
            </li>
          </ul>
        </div>

        <div class="mt-8">
          <span>Border Countries: </span>
          <al-btn
            class="mr-2 mt-2 px-3 shadow-lg text-sm"
            v-for="(border, index) in country.borders"
            :key="index"
          >
            {{ border }}
          </al-btn>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-xl font-bold">Loading...</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Presenter from "../mixins/Presenter";
import ChevronLeft from "../components/app/Icons/ChevronLeft.vue";
import AlBtn from "../components/core/Button/AlBtn.vue";
import AlIcon from "../components/core/Icon/AlIcon.vue";
import AlImg from "../components/core/Image/AlImg.vue";

export default {
  name: "Detail",
  components: { AlBtn, AlIcon, ChevronLeft, AlImg },
  mixins: [Presenter],
  computed: {
    ...mapState("api", ["country"]),
  },
  data: () => ({
    loading: true,
    fields: {
      basic: [
        {
          title: "Native name",
          field: "nativeName",
        },
        {
          title: "Population",
          field: "population",
          presenter: true,
        },
        {
          title: "Region",
          field: "region",
        },
        {
          title: "Sub Region",
          field: "subregion",
          subField: "name",
        },
        {
          title: "Capital",
          field: "capital",
        },
      ],
      advanced: [
        {
          title: "Top Level Doamin",
          field: "topLevelDomain",
        },
        {
          title: "Currencies",
          field: "currencies",
          subField: "name",
        },
        {
          title: "Languages",
          field: "languages",
          subField: "name",
        },
      ],
    },
  }),
  async mounted() {
    try {
      this.loading = true;
      await this.getCountryDetail(this.$attrs.country);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    ...mapActions("api", ["getCountryDetail"]),
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
@use "@/scss/pages/detail.scss";
</style>
