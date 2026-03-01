import type { Config } from "tailwindcss";

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
        lolcat: {
          pink: "#ff69b4",
          purple: "#9370db",
        }
      },
      boxShadow: {
        'neon-pink': '0 0 15px rgba(255, 105, 180, 0.5)',
        'neon-purple': '0 0 15px rgba(147, 112, 219, 0.5)',
      }
    },
  },
  plugins: [],
} satisfies Config;
