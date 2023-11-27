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
        menuopen:'menu_open 5s ease-in-out alternate',
        menuclose:'menu_close 5s ease-in-out reverse',
      },
      
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateY(-5px)' ,opacity:0},
          '100%': { transform: 'translateY(30px)',opacity:1 },
          '0%': { transform: 'translateY(-180px)',opacity:0 },
          
        },
        menu_open: {
          '0%': { transform: 'translateX(-15px)' ,left:"-200px"},
          '100%': { transform: 'translateX(0px)',left:"0px" },
        },
        menu_close: {
          '100%': { transform: 'translateX(0px)' ,left:"0px"},
          '0%': { transform: 'translateX(-20px)',left:"-200px" ,width: '0px' ,visibility: 'hidden'},
          // '0%':{visibility:""}
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
