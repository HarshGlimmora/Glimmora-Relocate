import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        paper: "hsl(var(--paper) / <alpha-value>)",
        "paper-soft": "hsl(var(--paper-soft) / <alpha-value>)",
        canvas: "hsl(var(--canvas) / <alpha-value>)",
        ink: "hsl(var(--ink) / <alpha-value>)",
        "ink-soft": "hsl(var(--ink-soft) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        "muted-strong": "hsl(var(--muted-strong) / <alpha-value>)",
        rule: "hsl(var(--rule) / <alpha-value>)",
        "rule-strong": "hsl(var(--rule-strong) / <alpha-value>)",
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          soft: "hsl(var(--accent-soft) / <alpha-value>)",
          ink: "hsl(var(--accent-ink) / <alpha-value>)",
        },
        success: "hsl(var(--success) / <alpha-value>)",
        "success-soft": "hsl(var(--success-soft) / <alpha-value>)",
        warning: "hsl(var(--warning) / <alpha-value>)",
        "warning-soft": "hsl(var(--warning-soft) / <alpha-value>)",
        danger: "hsl(var(--danger) / <alpha-value>)",
        "danger-soft": "hsl(var(--danger-soft) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 5.5vw, 5.25rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display-xl": ["clamp(2.25rem, 4vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.022em" }],
        "display-lg": ["clamp(1.875rem, 3vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.018em" }],
      },
      letterSpacing: {
        label: "0.16em",
      },
      boxShadow: {
        hairline: "0 0 0 1px hsl(var(--rule))",
        "hairline-strong": "0 0 0 1px hsl(var(--rule-strong))",
        dossier: "0 1px 0 hsl(var(--rule)), 0 24px 48px -32px hsl(var(--ink) / 0.18)",
        "dossier-lg": "0 1px 0 hsl(var(--rule)), 0 40px 64px -40px hsl(var(--ink) / 0.22)",
      },
      borderRadius: {
        DEFAULT: "2px",
        md: "3px",
        lg: "4px",
      },
      animation: {
        "fade-in": "fade-in 480ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "rise-in": "rise-in 560ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "sweep": "sweep 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
