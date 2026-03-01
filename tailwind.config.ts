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
        background: "#050505",
        matrix: {
          blue: "#00f2ff",
          dark: "#001a1c",
        },
        lolcat: {
          pink: "#ff69b4",
          purple: "#9370db",
        }
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 105, 180, 0.7)',
        'neon-blue': '0 0 20px rgba(0, 242, 255, 0.7)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'matrix-gradient': 'linear-gradient(180deg, rgba(0, 242, 255, 0.05) 0%, transparent 100%)',
      }
    },
  },
  plugins: [],
} satisfies Config;
