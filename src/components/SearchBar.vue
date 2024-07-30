<template>
  <div class="tw-w-full">
    <div
      class="tw-flex tw-items-center tw-space-x-4 tw-bg-white dark:tw-bg-dark-blue tw-rounded-md tw-px-6 tw-shadow-sm placeholder:dark:tw-text-white placeholder:tw-text-dark-gray"
    >
      <v-icon
        name="md-search-outlined"
        class="tw-text-dark-gray dark:tw-text-white"
      />
      <input
        v-model="search"
        @input="updateSearch"
        type="text"
        placeholder="Search for a country..."
        class="tw-bg-transparent tw-appearance-none focus:tw-outline-none tw-w-full tw-py-3"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch } from "vue";

const emit = defineEmits(["search", "update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const search = ref(props.modelValue);

const updateSearch = () => {
  emit("update:modelValue", search.value);
};

watch(
  () => props.modelValue,
  (newVal) => {
    search.value = newVal;
  }
);
</script>

<style lang="scss" scoped></style>
