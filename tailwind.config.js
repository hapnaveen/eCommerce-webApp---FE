/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      'primaryBlue': '#001EB9',
      'primaryDarkGrey': '#162427',
      'primaryGrey': '#969191',
      'primaryLightGrey': '#F7F7F7',
      'white': '#FFFFFF',
    },
    fontFamily: {
      'satoshi': ['Satoshi', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

