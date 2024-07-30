/** @type {import('tailwindcss').Config} */
export default {
  prefix: "tw-",
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#263743",
        "very-dark-blue-bg": "#1D2A31",
        "very-dark-blue-text": "#121416",
        "dark-gray": "#858585",
        "very-light-gray": " #FAFAFA",
      },
    },
  },
  plugins: [],
};
