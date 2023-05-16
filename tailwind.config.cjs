/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      colors: {
        shopperGreen: '#0dab77',
        shopperLightGreen: '#0ebe83',
        shopperBlack: '#1c1a38',
        shopperLightBlack: '#2a2754',
      },
    },
  },
  plugins: [],
};
