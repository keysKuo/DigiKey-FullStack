/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        // 'node_modules/flowbite-react/lib/esm/**/*.js'
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    100: '#f3f4f6',
                    200: '#e6e8eb',
                    300: '#3c4b64',
                    400: '#303c54',
                },
                black: {
                    DEFAULT: '#000',
                    500: '#22002D',
                },

                red: {
                    300: '#D0011B',
                },
                orange: {
                    200: '#f97316',
                    300: '#EE4D2D',
                },
            },
            fontFamily: {
                worksans: ['Work Sans', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
                ubuntu: ['Ubuntu Medium', 'sans-serif'],
                roboto: ['Roboto Medium', 'sans-serif'],
            },
            boxShadow: {
                card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            },
            width: {
                layout: '1200px',
            },
            screens: {
                '2sm': { min: '0px', max: '575px' },
                sm: { min: '575px', max: '768px' },
                md: { min: '768px', max: '991px' },
                lg: { min: '991px', max: '1240px' },
                xl: { min: '1240px' },
            },
        },
    },
    // plugins: [require('flowbite/plugin')],
};
