import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  MdDarkmodeOutlined,
  MdSearchOutlined,
  MdKeyboardarrowdownOutlined,
  MdArrowback,
} from "oh-vue-icons/icons";

import App from "./App.vue";
import "./assets/css/main.css";

import HomeView from "./pages/index.vue";
import CountryView from "./pages/country.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/country", component: CountryView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("Navigating to:", to.fullPath);
  next();
});

addIcons(
  MdDarkmodeOutlined,
  MdSearchOutlined,
  MdKeyboardarrowdownOutlined,
  MdArrowback
);

createApp(App).use(router).component("v-icon", OhVueIcon).mount("#app");
