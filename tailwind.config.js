module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    flexGrow: {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
