/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      colors: {
        shopperGreen: '#0dab77',
        shopperBlack: '#1c1a38',
      },
    },
  },
  plugins: [],
};
