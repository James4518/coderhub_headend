/** @type {import('tailwindcss').Config} */
if (!Object.hasOwn) {
  Object.hasOwn = (obj, key) => {
    return typeof obj === 'object' && obj.hasOwnProperty(key);
  };
}
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
};
