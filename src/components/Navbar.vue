<template>
  <nav
    class="tw-shadow-sm tw-bg-white dark:tw-bg-dark-blue tw-sticky tw-top-0 tw-w-full"
  >
    <section class="tw-flex tw-items-center tw-justify-between body-alignment">
      <RouterLink to="/">
        <h3 class="tw-font-bold">Where in the world?</h3>
      </RouterLink>

      <button
        @click.prevent="toggleDarkMode()"
        class="tw-flex tw-items-center tw-space-x-2 tw-text-sm"
      >
        <v-icon name="md-darkmode-outlined" />
        <span>Dark Mode</span>
      </button>
    </section>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";

const emit = defineEmits("toggleDarkMode");

const toggleDarkMode = () => {
  emit("toggleDarkMode");
};
</script>

<style lang="scss" scoped></style>
