/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#06121F',
          secondary: '#0A1B2B',
          card: '#102638',
          cyan: '#00E5FF',
          turquoise: '#00FFD1',
          blue: '#168CFF',
          violet: '#765BFF',
          text: '#F5FBFF',
          muted: '#9BB4C5',
        },
      },
      keyframes: {
        'scan-y': {
          '0%': { top: '0%' },
          '50%': { top: '96%' },
          '100%': { top: '0%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'scan-y': 'scan-y 3s ease-in-out infinite',
        fadeIn: 'fadeIn 0.25s ease-out forwards',
      },
    },
  },
  plugins: [],
};
