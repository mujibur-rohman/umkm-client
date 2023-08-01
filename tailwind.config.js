/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9376E0",
        "primary-focus": "#775DC4",
        "primary-content": "#ffffff",
        secondary: "#E893CF",
        "secondary-focus": "#E893CF",
        accent: "#F3BCC8",
        "accent-focus": "#F3BCC8",
        success: "#00C897",
        neutral: "#a8a8a8",
        "neutral-focus": "#a8a8a8",
        warning: "#FFD365",
        error: "#FF6D60",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
