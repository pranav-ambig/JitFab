/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    backgroundImage: {
      'factory': "url('/assets/factory.png')",
      'location': "url('/assets/location.png')",
     
    },
  },
  plugins: [],
}