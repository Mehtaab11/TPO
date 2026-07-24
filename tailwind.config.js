/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mustard: {
          DEFAULT: "#F2AA04",
          hover: "#D99603",
          light: "#FEF7E6",
        },
        navy: {
          DEFAULT: "#122340",
          light: "#1E3A8A",
          dark: "#0B1526",
        },
        warmgray: {
          DEFAULT: "#808080",
          light: "#A0A0A0",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Poppins'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
