/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E50914",
        "primary-dark": "#B20710",
        background: "#000000",
        "background-light": "#141414",
        "background-lighter": "#181818",
        surface: "#2F2F2F",
        "surface-light": "#333333",
        text: "#FFFFFF",
        "text-muted": "#B3B3B3",
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      aspectRatio: {
        'video': '16 / 9',
        'poster': '2 / 3',
      },
    },
  },
  plugins: [],
}
