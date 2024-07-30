<template>
  <div
    class="tw-h-auto tw-min-h-screen tw-bg-very-light-gray dark:tw-bg-very-dark-blue-bg tw-pb-10"
  >
    <section class="body-alignment">
      <div class="tw-space-y-10">
        <div class="tw-pt-5">
          <button
            @click.prevent="$router.go(-1)"
            class="tw-shadow tw-py-2 tw-px-6 tw-flex tw-items-center tw-space-x-2 tw-bg-white dark:tw-bg-dark-blue"
          >
            <v-icon name="md-arrowback" />
            <span>Back</span>
          </button>
        </div>

        <div
          v-if="isLoading"
          class="tw-grid lg:tw-grid-cols-2 tw-grid-cols-1 tw-gap-10 tw-items-center"
        >
          <div class="tw-w-full lg:tw-h-[350px]">
            <div role="status" class="tw-animate-pulse tw-shadow">
              <div
                class="tw-flex tw-items-center tw-justify-center tw-h-[350px] tw-bg-gray-300 dark:tw-bg-dark-blue"
              ></div>
            </div>
          </div>

          <div>
            <div role="status" class="tw-animate-pulse tw-shadow">
              <div class="tw-space-y-5 tw-p-5">
                <div
                  class="tw-h-2.5 tw-bg-gray-200 dark:tw-bg-dark-blue tw-rounded-full tw-w-48"
                ></div>
                <div
                  class="tw-h-2 tw-bg-gray-200 dark:tw-bg-dark-blue tw-rounded-full"
                ></div>
                <div
                  class="tw-h-2 tw-bg-gray-200 dark:tw-bg-dark-blue tw-rounded-full"
                ></div>
                <div
                  class="tw-h-2 tw-bg-gray-200 dark:tw-bg-dark-blue tw-rounded-full"
                ></div>
              </div>

              <div class="tw-space-y-5 tw-p-5">
                <div
                  class="tw-h-2.5 tw-bg-gray-200 dark:tw-bg-dark-blue tw-rounded-full tw-w-48"
                ></div>
                <div
                  class="tw-h-2 tw-bg-gray-200 dark:tw-bg-dark-blue tw-rounded-full"
                ></div>
                <div
                  class="tw-h-2 tw-bg-gray-200 dark:tw-bg-dark-blue tw-rounded-full"
                ></div>
                <div
                  class="tw-h-2 tw-bg-gray-200 dark:tw-bg-dark-blue tw-rounded-full"
                ></div>
              </div>

              <div class="tw-space-y-5 tw-p-5">
                <div
                  class="tw-h-2.5 tw-bg-gray-200 dark:tw-bg-dark-blue tw-rounded-full tw-w-48"
                ></div>
                <div
                  class="tw-h-2 tw-bg-gray-200 dark:tw-bg-dark-blue tw-rounded-full"
                ></div>
                <div
                  class="tw-h-2 tw-bg-gray-200 dark:tw-bg-dark-blue tw-rounded-full"
                ></div>
                <div
                  class="tw-h-2 tw-bg-gray-200 dark:tw-bg-dark-blue tw-rounded-full"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="tw-grid lg:tw-grid-cols-2 tw-grid-cols-1 tw-gap-10 tw-items-center"
        >
          <div class="tw-w-full lg:tw-h-[350px]">
            <img
              :src="country?.flags?.svg"
              :alt="country?.name?.common"
              class="tw-w-full tw-h-full tw-object-cover"
            />
          </div>
          <div class="tw-space-y-8">
            <h3 class="tw-text-2xl tw-font-bold">
              {{ country?.name?.common }}
            </h3>

            <div class="tw-grid lg:tw-grid-cols-2 tw-grid-cols-1 tw-gap-5">
              <div class="tw-space-y-5">
                <p>
                  Official name:
                  {{ country?.name.official }}
                </p>
                <p>
                  Native name:
                  {{
                    Object.entries(country?.name?.nativeName)
                      .map(([name, { official, common }]) => `${official}`)
                      .join(",", " ")
                  }}
                </p>
                <p>
                  Population:
                  {{ new Intl.NumberFormat().format(country.population ?? 0) }}
                </p>
                <p>Region: {{ country?.region }}</p>
                <p>Sub Region: {{ country?.subregion ?? "NA" }}</p>
                <p>Capital: {{ country?.capital[0] }}</p>
              </div>
              <div class="tw-space-y-5">
                <p>Top Level Domain: {{ country?.tld[0] }}</p>
                <p>
                  Currencies:
                  {{
                    Object.entries(country?.currencies)
                      .map(([code, { name, symbol }]) => `${name}(${symbol}) `)
                      .join("; ")
                  }}
                </p>
                <p>
                  Languages:
                  {{
                    Object.entries(country?.languages)
                      .map(([name, title]) => `${title}`)
                      .join(",", "")
                  }}
                </p>
              </div>
            </div>

            <div class="tw-space-y-3" v-if="country?.borders">
              <p>Border Countries:</p>

              <div class="tw-flex tw-items-center tw-flex-wrap tw-gap-3">
                <div
                  v-for="(border, i) in country?.borders"
                  :key="i"
                  class="tw-w-max tw-shadow tw-py-2 tw-px-6 tw-flex tw-items-center tw-space-x-2 tw-bg-white dark:tw-bg-dark-blue tw-cursor-pointer"
                  @click.prevent="viewPage(border)"
                >
                  <span>{{ border }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const isLoading = ref(true);

const route = useRoute();
const router = useRouter();
const countryCode = route.query.country_code;

const country = ref(null);

const getCountry = async (code) => {
  try {
    isLoading.value = true;
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha/${code}`
    );

    const data = await response.data;
    country.value = data[0];
  } catch (error) {
    console.error("an error occurred", error);
  } finally {
    isLoading.value = false;
  }
};

const viewPage = (code) => {
  router.push({
    path: `/country`,
    query: {
      country_code: code,
    },
  });
};

watch(
  () => route.query.country_code,
  async (newCountryCode) => {
    await getCountry(newCountryCode);
  }
);

onMounted(async () => {
  await getCountry(countryCode);
  window.scrollTo(0, 0);
});
</script>

<style lang="scss" scoped></style>
