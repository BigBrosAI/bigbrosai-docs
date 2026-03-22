import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // BigBrosAI design tokens
        canvas: {
          DEFAULT: "#0d1117",
          subtle: "#161b22",
          inset: "#1c2128",
        },
        border: {
          DEFAULT: "#21262d",
          muted: "#30363d",
        },
        fg: {
          DEFAULT: "#e1e4e8",
          muted: "#8b949e",
          subtle: "#6a737d",
        },
        accent: {
          blue: "#1f6feb",
          "blue-bright": "#388bfd",
          green: "#3fb950",
          orange: "#f0883e",
          red: "#f97583",
          purple: "#d2a8ff",
          cyan: "#79c0ff",
        },
        whatsapp: {
          DEFAULT: "#25d366",
          dark: "#128c7e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Cascadia Code", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0", transform: "translateY(4px)" }, to: { opacity: "1", transform: "none" } },
        slideIn: { from: { opacity: "0", transform: "translateX(-8px)" }, to: { opacity: "1", transform: "none" } },
      },
    },
  },
  plugins: [],
};

export default config;
