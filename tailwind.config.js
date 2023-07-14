/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			'body': ['"Montserrat"', 'sans-serif'],
			'sans': ['"Montserrat"', 'sans-serif'],
			'serif': ['"Libre Caslon Text"', 'sans-serif'],
		},
		extend: {
			colors: {
				'accent': '#DAAA63',
				'accent2': '#2C1810',
				'bg': '#f3e5d0',
				'light-bg': '#f8f3ed',
			},
		}
	},
	plugins: [],
}

