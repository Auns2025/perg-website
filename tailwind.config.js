/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        perg: {
          blue: '#075A9C',
          'blue-dark': '#063B70',
          'blue-deep': '#04274C',
          'blue-navy': '#0A1A2F',
          'blue-bright': '#087DCE',
          'blue-light': '#EAF4FB',
          'blue-subtle': '#F4F9FD',
          charcoal: '#17212B',
          gray: '#64748B',
          'gray-light': '#F8FAFC',
          'gray-border': '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.15em',
      }
    },
  },
  plugins: [],
}
