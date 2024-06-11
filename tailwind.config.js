/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}","./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

