/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                custom: ['IRANSansXBold', 'IRANSansXDemiBold'],
            },
            colors: {
                primary: "#3792D5",
                primaryMiddle: "#CCEBFF",
                primaryLight: "#ECF7FF",
                secondary: "#CCEBFF",
                accent: "#E89325",
                error: "#FB8C00",
                background: "#FBF9EF",
                onBackground: "#011936",
                success: "#4CAF50",
            },
        },
    },
    plugins: [],
};
