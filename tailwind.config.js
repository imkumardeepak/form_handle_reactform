// tailwind.config.js
import forms from '@tailwindcss/forms';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // Enable dark mode by class
  plugins: [forms], // Use the imported 'forms' plugin
};
