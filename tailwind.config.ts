import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#2A9D8F",
          navy: "#264653",
          coral: "#E76F51",
          sage: "#8AB17D",
          light: "#ECF4E8",
        },
      },
    },
  },
  plugins: [],
};

export default config;