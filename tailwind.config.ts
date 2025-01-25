import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {

		extend: {
			fontFamily: {
				'inter': ['var(--inter)'],
				'roboto': ['var(--roboto)']
			},
			screens: {
				'mobile': '640px',
				'tablet': '800px',
				'laptop': '1024px',
				'desktop': '1280px',
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				card: {
					DEFAULT: 'var(--card)',
					foreground: 'var(--card-foreground)',
					light: 'var(--card-light)',
				},
				surface: 'var(--surface)',
				popover: {
					DEFAULT: 'var(--popover)',
					foreground: 'var(--popover-foreground)',
				},
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground)',
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)',
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)',
					card: 'var(--muted-card)',

				},
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--accent-foreground)',
				},
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)',
				},
				border: 'var(--border)',
				input: 'var(--input)',
				ring: 'var(--ring)',
				chart: {
					'1': 'var(--chart-1)',
					'2': 'var(--chart-2)',
					'3': 'var(--chart-3)',
					'4': 'var(--chart-4)',
					'5': 'var(--chart-5)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			// fonts:
			text: {
				xs: ['0.75rem', { lineHeight: '4rem' }], // Extra small
				sm: ['0.875rem', { lineHeight: '1.25rem' }], // Small
				base: ['1rem', { lineHeight: '1.5rem' }], // Base (default)
				lg: ['1.125rem', { lineHeight: '1.75rem' }], // Large
				xl: ['1.25rem', { lineHeight: '1.75rem' }], // Extra large
				'2xl': ['1.5rem', { lineHeight: '2rem' }], // 2X large
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 3X large
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 4X large
				'5xl': ['3rem', { lineHeight: '1' }], // 5X large
				'6xl': ['3.75rem', { lineHeight: '1' }], // 6X large
				'7xl': ['4.5rem', { lineHeight: '1' }], // 7X large
				'8xl': ['6rem', { lineHeight: '1' }], // 8X large
				'9xl': ['8rem', { lineHeight: '1' }], // 9X large
			},

		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
