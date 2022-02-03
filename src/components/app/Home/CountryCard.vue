<template>
  <al-card link :to="`/detail/${country.name}`" elevated rounded>
    <template #image>
      <al-img height="160px" width="100%" :src="country.flag" />
    </template>
    <template #title>
      {{ country.name }}
    </template>

    <template #text>
      <ul class="list-style-none mt-3">
        <li>
          <span class="font-semibold text-sm mr-2">Population:</span>
          <span class="text-sm font-light">{{
            country.population | prettyNumbers
          }}</span>
        </li>
        <li>
          <span class="font-semibold text-sm mr-2">Region:</span>
          <span class="text-sm font-light">{{ country.region }}</span>
        </li>
        <li>
          <span class="font-semibold text-sm mr-2">Capital:</span>
          <span class="text-sm font-light">{{ country.capital }}</span>
        </li>
      </ul>
    </template>
  </al-card>
</template>

<script>
import AlCard from "../../core/Card/AlCard.vue";
import AlImg from "../../core/Image/AlImg.vue";

export default {
  components: { AlCard, AlImg },
  name: "CountryCard",

  props: {
    country: {
      type: Object,
      required: true,
    },
  },
  filters: {
    prettyNumbers(number) {
      return number
        .toString()
        .split("")
        .reverse()
        .join("")
        .split(/(.{3})/)
        .filter((o) => o)
        .map((s) => s.split("").reverse().join(""))
        .reverse()
        .join();
    },
  },
};
</script>

<style></style>
