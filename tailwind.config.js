/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#132531",
        "ghost-blue": "#BCCEDA",
        "light-blue": "#31485A",
        orange: "#FFA114",
      },
    },
  },
  plugins: [],
};
