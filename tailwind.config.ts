import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";



const config: Config = {
  darkMode: "class",
 content: [
  "./src/app/**/*.{ts,tsx}",
  "./src/components/**/*.{ts,tsx}",
  "./src/lib/**/*.{ts,tsx}",
],
  theme: {
    extend: {
      colors: {
        // Brand colors
        "brand-gold": "#CC9933",
        "brand-black": "#000000",

        // CSS variable-driven colors
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-lexend)", "system-ui", "sans-serif"],
        lexend: ["var(--font-lexend)", "system-ui", "sans-serif"],
        century: ['"Century Gothic"', "var(--font-lexend)", "system-ui", "sans-serif"],
      },
    },
  },

  plugins: [],
};

export default config;
