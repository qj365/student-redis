/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'media',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('flowbite/plugin')],
};
