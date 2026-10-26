export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gridwise: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          900: '#0f172a',
          800: '#1e293b',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          orange: '#f97316'
        }
      }
    },
  },
  plugins: [],
}
