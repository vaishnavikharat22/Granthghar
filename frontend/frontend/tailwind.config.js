/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#3E2522', // Dark Chocolate
        'brand-brown': '#8C6E63', // Muted Brown
        'brand-tan': '#D3A376',   // Warm Tan
        'brand-peach': '#FFE0B2', // Light Peach
        'brand-cream': '#FFF2DF', // Creamy White
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
