/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#020617", // slate-950
                surface: "#0f172a", // slate-900
                surfaceHighlight: "#1e293b", // slate-800
                primary: "#8b5cf6", // violet-500
                primaryHover: "#7c3aed", // violet-600
                accent: "#06b6d4", // cyan-500
            },
            fontFamily: {
                plaster: ['"Plaster"', 'cursive'], // Example modern font, might need Google Fonts import
                sans: ['"Inter"', 'sans-serif'],
            },
            animation: {
                'gradient-x': 'gradient-x 15s ease infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [],
}
