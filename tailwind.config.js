/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "fondo-web": "url('/img/fondoWeb.svg')",
      },
    },
  },
  plugins: [],
};
