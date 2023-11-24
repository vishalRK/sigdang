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
