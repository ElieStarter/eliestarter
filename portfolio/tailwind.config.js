/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tagesschrift: ['Tagesschrift', 'cursive'],
        playfair: ['Playfair Display', 'serif'],
        baskerville: ['Libre Baskerville', 'serif']
      },
    },
  },
  plugins: [],
}
