const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 2s ease-in-out',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateY(-20px)' ,opacity:0},
          '100%': { transform: 'translateY(5px)',opacity:1 },
        },
      },
      screens: {
        small: { raw: '(max-width: 540px)' },
        medium: { raw: '(min-width: 520px)' },
        smd: { raw: '(min-width: 640px)' },
        large: { raw: '(min-width: 1025px)' },
        extralarge: { raw: '(min-width: 1281px)' },
      },
    },
  },
  plugins: [],
};
