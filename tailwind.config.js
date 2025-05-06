/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'blob-bounce': {
          '0%': { transform: 'translate(-100%, -100%) translate3d(0, 0, 0)' },
          '25%': { transform: 'translate(-100%, -100%) translate3d(100%, 0, 0)' },
          '50%': { transform: 'translate(-100%, -100%) translate3d(100%, 100%, 0)' },
          '75%': { transform: 'translate(-100%, -100%) translate3d(0, 100%, 0)' },
          '100%': { transform: 'translate(-100%, -100%) translate3d(0, 0, 0)' },
        },
        'step-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(90deg)' },
          '25%': { transform: 'rotate(90deg)' }, // Hold for a bit
          '45%': { transform: 'rotate(180deg)' },
          '50%': { transform: 'rotate(180deg)' }, // Hold for a bit
          '70%': { transform: 'rotate(270deg)' },
          '75%': { transform: 'rotate(270deg)' }, // Hold for a bit
          '95%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(360deg)' }, // Hold for a bit
        },
      },
      animation: {
        'blob-bounce': 'blob-bounce 5s infinite ease',
        'step-rotate': 'step-rotate 4s infinite cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}