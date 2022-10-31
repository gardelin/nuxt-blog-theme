/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}'],
    theme: {
        extend: {
            fontFamily: {
                header: ['Inter', ...defaultTheme.fontFamily.sans],
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    darkMode: 'class',
    variants: {
        backgroundColor: ['hover', 'dark', 'dark-hover'],
        borderColor: ['hover', 'dark', 'dark-hover'],
        textColor: ['hover', 'dark', 'dark-hover'],
        opacity: ['disabled'],
    },
    plugins: [require('@tailwindcss/typography'), require('tailwindcss-dark-mode')()],
};
