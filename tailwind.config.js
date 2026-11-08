/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F4EFEA',
          light: '#FAF7F4',
          warm: '#EFE8E1',
        },
        warmBrown: {
          DEFAULT: '#5A3E36',
          dark: '#3F2A25',
          light: '#7A584E',
        },
        gold: {
          DEFAULT: '#C7A14A',
          light: '#DFC176',
          dark: '#A68233',
        },
        charcoal: {
          DEFAULT: '#1E1E1E',
          light: '#2A2A2A',
          dark: '#141414',
        },
        terracotta: '#C45C3D',
        olive: '#4F5D46',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}
