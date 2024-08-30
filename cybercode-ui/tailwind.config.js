/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        premium: "#FF8410",
        btn: "#232322",
        btn_background: "#2e2e2d",
        btn_hover: "#484848",
        main: "#1E1E1E",
        header: "#323233",
      },
    },
  },
  plugins: [],
};
