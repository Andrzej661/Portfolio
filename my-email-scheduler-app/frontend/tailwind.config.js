/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react")
export default {
	content: [
		"src/**/*.{js,ts,tsx,jsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			animation: {
				"svg-fill-1":
					"animate-svg-fill-1 2s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.1s both",
				"svg-fill-2":
					"animate-svg-fill-2 2s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.5s both",
				"svg-fill-3":
					"animate-svg-fill-3 2s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.9s both",
				"svg-fill-4":
					"animate-svg-fill-4 2s cubic-bezier(0.785, 0.135, 0.15, 0.86) 1.3000000000000003s both"
			},
			customClasses: {
				folder: {
					perspective: "500px",
					transition: "all 300ms ease"
				},
				folderHovered: {
					transform: "translate(-50%, -52%) rotateX(-15deg)"
				},
				folderInside: {
					transition: "all 200ms ease"
				},
				folderInsideHovered: {
					transform: "rotate(-7deg) translateY(-15%)"
				}
			},
			colors: {
				folder: "#ffba08",
				pink: "#C179B9",
				blue: "#92DCE5",
				green: "#53DD6C",
				danger: "#288B9D",
				darkblue: "#288B9D"
			},
			screens: {
				"3xl": "1500px"
			}
		}
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						background: "#FFFFFF", // or DEFAULT
						foreground: "#11181C", // or 50 to 900 DEFAULT
						gradient: "#efefef",
						// or 50 to 900 DEFAULT
						primary: {
							//... 50 to 900

							foreground: "#FFFFFF",
							DEFAULT: "#335fc5" // Some green color, definitely not blue
						}
					}
				},
				dark: {
					colors: {
						// or 50 to 900 DEFAULT
						gradient: "#080808",

						primary: {
							//... 50 to 900
							DEFAULT: "#335fc5"
						}
					}
				}
			}
		})
	]
}
