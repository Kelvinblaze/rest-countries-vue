<script setup>
import { ref, watch } from "vue";
import Navbar from "./components/Navbar.vue";

const isDarkMode = ref(false);

const toggleDarkMode = (value) => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<template>
  <div>
    <div
      :class="[
        isDarkMode
          ? 'tw-dark tw-text-very-dark-blue-text dark:tw-text-white'
          : '',
      ]"
    >
      <Navbar @toggleDarkMode="toggleDarkMode" />
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
