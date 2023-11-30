import type { Config } from "tailwindcss";
import { sand } from "@radix-ui/colors";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        priamry: {
          "50": "#fefbe8",
          "100": "#fdf6c4",
          "200": "#fde98b",
          "300": "#fbd649",
          "400": "#f8c017",
          "500": "#e5a50a",
          "600": "#c88006",
          "700": "#a05b08",
          "800": "#84470f",
          "900": "#703a13",
          "950": "#411d07",
        },
        gray: {
          "50": "#f6f5f5",
          "100": "#e7e6e6",
          "200": "#d2cfd0",
          "300": "#b3adae",
          "400": "#8c8485",
          "500": "#71696a",
          "600": "#605a5b",
          "700": "#514d4d",
          "800": "#474343",
          "900": "#3e3b3b",
          "950": "#121111",
        },
        ...sand,
      },
      boxShadow: {
        default: "0 4px 16px 0.5px rgb(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
