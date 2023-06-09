/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					100: "#783672",
					300: "#662E61",
					500: "#542650",
					700: "#31162F",
					900: "#0D060D",
				},
				light: {
					100: "#FAFAFA",
					200: "#F5F5F5",
					300: "#EBEBEB",
				},
			},
			// text: {
			// 	100: "",
			// 	200: "",
			// 	300: "zinc-800",
			// },
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
		plugins: [],
	},
};
