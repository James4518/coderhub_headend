/** @type {import('tailwindcss').Config} */
if (!Object.hasOwn) {
  Object.hasOwn = (obj, key) => {
    return typeof obj === 'object' && obj.hasOwnProperty(key);
  };
}
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        1200: '75rem'
      },
      colors: {
        'main': '#f2f3f5',
      }
    }
  },
  plugins: []
};
