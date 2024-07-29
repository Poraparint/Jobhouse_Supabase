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
          "primary": "#1F3A93",
          "secondary": "#3D3D3D",
          "third": "#D9D9D9",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
};
