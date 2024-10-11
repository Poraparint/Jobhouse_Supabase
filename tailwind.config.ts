/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#1F3A93",
        secondary: "#3D3D3D",
        third: "#5F5F5F",
        baht: "#238326",
        bg: "#FFFFFF",
        light: "#D9D9D9",
        danger: "#BB2124",

        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1F3A93",
          secondary: "#3D3D3D",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
