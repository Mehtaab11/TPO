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
        golden: {
          DEFAULT: "#EAB308",
          hover: "#D97706",
          light: "#FEF9C3",
          50: "#FEFCE8",
          100: "#FEF9C3",
          500: "#EAB308",
          600: "#D97706",
        },
        darkbg: "#111827",
        pagebg: "#F8FAFC",
        bordergray: "#E5E7EB",
        textprimary: "#111827",
        textsecondary: "#6B7280",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        modal: "24px",
        item: "12px",
      },
    },
  },
  plugins: [],
};
