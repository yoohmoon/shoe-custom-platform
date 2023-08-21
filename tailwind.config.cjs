/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    screens: {
      mobile: '480px',
      tabletSmall: '576px',
      moLandscape: '767px',
      tablet: '1023px',
      desktop: '1279px',
    },
    extend: {},
  },

  plugins: [],
};

module.exports = config;
