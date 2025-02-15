/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["src/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: {
					DEFAULT: "hsl(var(--background))",
					light: "hsl(var(--background-light))"
				},
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				surface: {
					DEFAULT: "hsl(var(--surface))",
					100: "hsl(var(--surface100))",
					200: "hsl(var(--surface200))",
					300: "hsl(var(--surface300))",
					400: "hsl(var(--surface400))",
					500: "hsl(var(--surface500))",
					600: "hsl(var(--surface600))",
					700: "hsl(var(--surface700))",
					800: "hsl(var(--surface800))",
				}
			},
			borderRadius: {
				lg: `var(--radius)`,
				md: `calc(var(--radius) - 2px)`,
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	variants: {
		scrollbar: ['hover'], // Allow scrollbar styles on hover
	},
	plugins: [require("tailwindcss-animate")],
}
