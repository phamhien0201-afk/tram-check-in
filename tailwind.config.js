/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        y2k: {
          purple: "#f4f0fa",
          pink: "#fff0f5",
          lavender: "#f8f5ff",
          sky: "#f0f8ff",
          peach: "#fff5f0",
          yellow: "#fffbea",
          mint: "#f0fdf4",
          dark: "#332d4a"
        }
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      },
    }
  },
  plugins: [],
}
