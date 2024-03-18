import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./MUI/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      color: {
        primary: "#1516d6",
        secondary: "#ff9900",
        accent: "#ff0000",
      },
      textColor: {
        primary: "#1516d6",
        secondary: "#ff9900",
        accent: "#ff0000",
      },
      backgroundColor: {
        primary: "#1516d6",
        secondary: "#ff9900",
        accent: "#ff0000",
      },
      width: {
        layout: "1250px",
        sectionLayout: "1024px",
      },
      maxWidth: {
        layout: "1250px",
        sectionLayout: "1024px",
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
export default config;