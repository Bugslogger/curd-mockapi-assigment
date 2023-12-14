/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1597E4",
        white: "#FAFAFA",
        error: "#D86161",
        dark: "#212121",
        gray: "#e6e6e6",
        "text-placeholder": "#7a7a7a",
      },
    },
    fontFamily: {
      poppins: ["Poppins, sans-serif"],
    },
  },
  plugins: [],
};
