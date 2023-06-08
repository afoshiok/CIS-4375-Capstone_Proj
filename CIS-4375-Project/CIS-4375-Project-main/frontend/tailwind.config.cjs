/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#fccb58',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['dracula']
  }
}
