/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e8edf4',
          100: '#c5d1e3',
          200: '#9fb3d0',
          300: '#7895bd',
          400: '#5b7eaf',
          500: '#3e67a1',
          600: '#355a8f',
          700: '#2a4a78',
          800: '#1E3A5F',
          900: '#112640',
          950: '#081524',
        },
        accent: {
          50: '#fff8ec',
          100: '#ffefd0',
          200: '#ffdda0',
          300: '#ffc866',
          400: '#F5A623',
          500: '#f09000',
          600: '#d47500',
          700: '#b05800',
          800: '#8e4400',
          900: '#753800',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
