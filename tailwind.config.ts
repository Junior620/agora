import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        agGreen: "#007f59",
        /* Couleurs tirées du logo AGORA : prune (lettrage) et sable (bobines). */
        brand: {
          plum: "#35203a",
          sand: "#d8c39d",
          "sand-dark": "#b89b6a",
        },
      },
      fontFamily: {
        sans: ["var(--font-raleway)", "Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 30px rgba(0, 0, 0, 0.18)",
      },
    },
  },
  plugins: [],
} satisfies Config;
