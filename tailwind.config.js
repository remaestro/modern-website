/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New modern palette
        'energy-green': {
          DEFAULT: '#00FF87',
          50: '#E6FFF5',
          100: '#B3FFE0',
          200: '#80FFCB',
          300: '#4DFFB6',
          400: '#1AFFA1',
          500: '#00FF87',
          600: '#00CC6C',
          700: '#009951',
          800: '#006636',
          900: '#003D20',
        },
        'cyber-blue': {
          DEFAULT: '#00D4FF',
          500: '#00D4FF',
          600: '#00A8CC',
          700: '#007A99',
        },
        'plasma-purple': '#9333EA',
        'solar-orange': '#FF6B00',
        'deep-black': '#0A0A0A',
        'graphite': '#1A1A1A',
        'dark-gray': '#2A2A2A',
        // Keep old colors for compatibility
        'digita-green': {
          DEFAULT: '#52BA63',
          700: '#3d8f4c',
        },
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 8vw, 8rem)',
        'display': 'clamp(2rem, 5vw, 4rem)',
        'section': 'clamp(1.5rem, 3vw, 2.5rem)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 255, 135, 0.5), 0 0 40px rgba(0, 255, 135, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(0, 255, 135, 0.8), 0 0 60px rgba(0, 255, 135, 0.5)' 
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'energy-gradient': 'linear-gradient(135deg, #00FF87 0%, #00D4FF 100%)',
        'power-gradient': 'linear-gradient(180deg, #39FF14 0%, #00FF87 50%, #9333EA 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

