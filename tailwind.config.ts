import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        agGreen: "#007f59",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 30px rgba(0, 0, 0, 0.18)",
      },
    },
  },
  plugins: [],
} satisfies Config;
