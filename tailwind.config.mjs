
export default {
    content: [
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
        colors: {
            primary: "#1E40AF",
            secondary: "#64748B",
            accent: "#FACC15",
        },
        fontFamily: {
            sans: ["Geist Sans", "system-ui", "sans-serif"],
            mono: ["Geist Mono", "monospace"],
        },
        },
    },
    plugins: [],
};