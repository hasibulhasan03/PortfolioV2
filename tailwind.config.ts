import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "var(--void)",
        surface: "var(--surface)",
        border: "var(--border)",
        "text-pri": "var(--text-pri)",
        "text-sec": "var(--text-sec)",
        accent: "var(--accent)",
        "accent-dim": "var(--accent-dim)",
        ghost: "var(--ghost)"
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};
export default config;
