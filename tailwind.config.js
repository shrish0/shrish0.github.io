/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        'background-soft': '#1e293b',
        primary: '#38bdf8',
        'primary-hover': '#0ea5e9',
        heading: '#f8fafc',
        text: '#cbd5e1',
        'text-mute': '#94a3b8',
      }
    },
  },
  plugins: [],
}
