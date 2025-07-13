// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brandDark: '#0F172A',
        brandPrussian: '#1E293B',
        brandWhite: '#F1F5F9',
        brandBlueHover: '#2563EB',
        brandBlue: '#3B82F6'


      },
      fontFamily: {
        inter:['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
