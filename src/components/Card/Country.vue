<template>
  <div>
    <div
      class="tw-cursor-pointer hover:tw-shadow-lg tw-shadow-sm tw-bg-white dark:tw-bg-dark-blue"
    >
      <div class="tw-h-[200px]">
        <img
          :src="country.flags.svg"
          :alt="country.name.common"
          class="tw-w-full tw-h-full tw-object-cover"
        />
      </div>
      <div class="card-content tw-p-5 tw-space-y-2">
        <h3
          class="lg:tw-text-xl tw-text-xl tw-font-semibold tw-text-very-dark-blue-text dark:tw-text-white"
        >
          {{ country.name.common }}
        </h3>

        <div class="tw-space-y-2 tw-text-dark-gray dark:tw-text-white">
          <p>
            Population:
            {{ new Intl.NumberFormat().format(country.population ?? 0) }}
          </p>
          <p>Region: {{ country.region }}</p>
          <p>Capital: {{ country.capital[0] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["country"]);
</script>

<style lang="scss" scoped></style>
