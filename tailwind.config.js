import { nextui } from "@nextui-org/react"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pink: "#C179B9",
        blue: "#92DCE5",
        green: "#53DD6C",
        yellow: "#DDD78D",
        darkblue: "#288B9D"
      }
    }
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            secondary: "#FFFFFF",
            background: "#FFFFFF", // or DEFAULT
            foreground: "#11181C", // or 50 to 900 DEFAULT
            gradient: "#e0e0e0",
            // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900

              foreground: "#000000",
              DEFAULT: "#335fc5" // Some green color, definitely not blue
            }
          }
        },
        dark: {
          colors: {
            secondary: "#010101",

            // or 50 to 900 DEFAULT
            gradient: "#0f0f0f",

            primary: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#335fc5"
            }
          }
        }
      }
    })
  ]
}
