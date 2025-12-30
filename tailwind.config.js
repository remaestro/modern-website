/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'digita-green': {
          DEFAULT: '#52BA63',
          50: '#e8f7eb',
          100: '#c5e9cb',
          200: '#9ed9a8',
          300: '#77c985',
          400: '#5abe6b',
          500: '#52BA63',
          600: '#48a658',
          700: '#3d8f4c',
          800: '#337841',
          900: '#205428',
        },
        'digita-dark': '#232323',
        'digita-gray': {
          100: '#f7f7f7',
          200: '#e7e7e7',
          400: '#cccccc',
          600: '#666666',
          900: '#232323',
        },
        'digita-orange': '#ff9800',
        'digita-blue': '#263442',
        'digita-gold': '#bc9355',
      }
    },
  },
  plugins: [],
}

