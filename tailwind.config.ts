import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0E14",
        panel: "#111827",
        card: "#151C28",
        cyan: "#00D4FF",
        violet: "#7B61FF"
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 32px rgba(0, 212, 255, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
