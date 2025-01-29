/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        TrendifyOrange: "#ff6600",
        TrendifyLightGray: "#3d3d3d",
        TrendifyDarkGray: "#2b2b2b",
        TrendifyText: "#ffffff",
        TrendifyDarkOrange: "#ff8533",
      },
    },
  },
  plugins: [],
};
