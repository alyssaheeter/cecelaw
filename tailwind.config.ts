import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "var(--bg-charcoal)",
        steel: "var(--accent-steel)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "glass-white": "var(--glass-white)",
      },
      fontFamily: {
        heading: ["Marcellus", "serif"],
        body: ["Lato", "sans-serif"],
      },
      transitionTimingFunction: {
        smooth: "var(--transition-smooth)",
      },
      boxShadow: {
        lift: "0 12px 30px rgba(153, 150, 179, 0.35)",
      },
      letterSpacing: {
        widehead: "0.05em",
        widernav: "0.15em",
        widebtn: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
