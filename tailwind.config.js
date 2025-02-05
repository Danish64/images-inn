/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: '#000000', // Main black
        'deep-gray': '#1A1A1A', // Dark background
        'soft-gray': '#333333', // Secondary UI
        'border-gray': '#666666', // Borders & dividers
        'text-white': '#FFFFFF', // Primary text
        'text-muted': '#D1D1D1', // Secondary text
        'highlight-white': '#EAEAEA', // Highlight elements
        'muted-gray': '#808080', // Disabled buttons, placeholders
        'panel-bg': '#F5F5F5', // Light background for panels
      },
    },
  },
  plugins: [],
};
