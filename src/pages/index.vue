<template>
  <div
    class="tw-h-auto tw-min-h-screen tw-bg-very-light-gray dark:tw-bg-very-dark-blue-bg"
  >
    <div class="body-alignment tw-space-y-10">
      <!-- Search & Filter Menu -->
      <section class="tw-pt-5">
        <div
          class="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-justify-between tw-gap-5"
        >
          <div class="md:tw-w-[350px] tw-w-full">
            <SearchBar v-model="search_text" />
          </div>

          <div>
            <FilterMenu @region="assignRegion" />
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section>
        <!-- Skeleton Loaders -->
        <div
          v-if="isLoading"
          class="tw-grid lg:tw-grid-cols-4 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-10"
        >
          <SkeletonCountryCard v-for="(skeleton, i) in 15" :key="i" />
        </div>

        <div v-else>
          <div v-if="filteredCountries.length === 0">
            <p>No Country Found</p>
          </div>
          <div
            v-else
            class="tw-grid lg:tw-grid-cols-4 md:tw-grid-cols-3 sm:tw-grid-cols-2 tw-grid-cols-1 tw-gap-10"
          >
            <div v-for="(country, idx) in filteredCountries" :key="idx">
              <RouterLink :to="`/country?country_code=${country.cca2}`">
                <CountryCard :country="country" />
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";

import SearchBar from "../components/SearchBar.vue";
import FilterMenu from "../components/FilterMenu.vue";
import CountryCard from "../components/Card/Country.vue";
import SkeletonCountryCard from "../components/Card/Skeleton.vue";

const search_text = ref("");
const selectedRegion = ref("");
const isLoading = ref(true);
const countries = ref([]);

const searchedCountries = computed(() => {
  if (!search_text.value) return countries.value;

  return countries.value.filter((country) =>
    country.name.common.toLowerCase().includes(search_text.value.toLowerCase())
  );
});

const filteredCountries = computed(() => {
  if (!selectedRegion.value) return searchedCountries.value;
  return searchedCountries.value.filter(
    (country) =>
      country.region.toLowerCase() === selectedRegion.value.toLowerCase()
  );
});

const getCountries = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca2"
    );

    const data = await response.data;
    countries.value = data;
  } catch (error) {
    console.error("an error occurred", error);
  } finally {
    isLoading.value = false;
  }
};

const assignRegion = (region) => {
  selectedRegion.value = region;
};

onMounted(async () => {
  await getCountries();
});
</script>

<style lang="scss" scoped></style>
