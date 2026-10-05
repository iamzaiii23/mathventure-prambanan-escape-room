/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#fff8f4",
        "surface-container-low": "#fff1e4",
        "surface-container": "#ffebd4",
        "surface-container-high": "#ffe4c3",
        "surface-container-highest": "#ffddb2",
        "surface-container-lowest": "#ffffff",
        primary: "#6f5100",
        "primary-container": "#8b6914",
        secondary: "#aa3700",
        "secondary-container": "#fc6b34",
        "on-surface": "#291800",
        "on-surface-variant": "#4e4637",
        "on-primary": "#ffffff",
        outline: "#807665"
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}