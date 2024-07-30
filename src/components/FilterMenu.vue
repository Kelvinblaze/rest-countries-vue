<template>
  <div class="tw-flex tw-space-x-5 tw-items-center">
    <div class="tw-w-max tw-relative tw-select-none">
      <div
        @click.prevent="isFilterActive = !isFilterActive"
        class="tw-flex tw-items-center tw-space-x-4 tw-bg-white dark:tw-bg-dark-blue tw-rounded-md tw-px-6 tw-shadow-sm placeholder:dark:tw-text-white placeholder:tw-text-dark-gray tw-cursor-pointer"
      >
        <p
          class="tw-bg-transparent tw-appearance-none focus:tw-outline-none tw-w-full tw-py-3"
        >
          Filter by region
        </p>

        <v-icon
          name="md-keyboardarrowdown-outlined"
          class="tw-text-dark-gray dark:tw-text-white"
        />
      </div>

      <div
        v-show="isFilterActive"
        class="tw-absolute tw-bg-white dark:tw-bg-dark-blue tw-rounded-md tw-shadow-md placeholder:dark:tw-text-white placeholder:tw-text-dark-gray tw-w-full tw-mt-1 tw-py-5"
      >
        <ul class="tw-space-y-2">
          <li
            @click.prevent="selectRegion(region)"
            v-for="(region, idx) in regions"
            :key="idx"
            class="tw-cursor-pointer hover:dark:tw-bg-very-dark-blue-bg hover:tw-bg-very-light-gray tw-px-6 tw-py-2"
          >
            {{ region }}
          </li>
        </ul>
      </div>
    </div>

    <div v-if="selectedRegion.toLowerCase() !== ''">
      <button @click.prevent="selectRegion('')" class="tw-text-red-500">
        Clear Filter
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["region"]);
const regions = ref(["Africa", "Americas", "Asia", "Europe", "Oceania"]);

const isFilterActive = ref(false);
const selectedRegion = ref("");
const selectRegion = (region) => {
  selectedRegion.value = region;
  isFilterActive.value = false;
  emit("region", region);
};
</script>

<style lang="scss" scoped></style>
