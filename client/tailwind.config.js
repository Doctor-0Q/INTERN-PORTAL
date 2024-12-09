/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arimo: ['Arimo', 'sans-serif'],
        geologica: ['Geologica', 'sans-serif'],
        kantumruy: ['Kantumruy', 'sans-serif'],
        mukta: ['Mukta','sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        customGray: '#767782',
      },
      fontSize: {
        'custom-41': '41px',
        'custom-33' : '33px',
      },
      lineHeight: {
        'custom-74': '74.07px',
      },
      boxShadow: {
        'y-4': '0 4px 8px rgba(0, 0, 0, 0.1)', // Example shadow
      },
    },
  },
  plugins: [],
}