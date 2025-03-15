/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['src/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      fontSize: {
        sm: '0.82rem', // Slightly bigger than the default 0.875rem (~14px → ~15.2px)
        base: '1rem', // 16px (default)
        md: '1.0625rem', // 17px
        lg: '1.125rem', // 18px (adjust as needed)
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          gradient: 'hsl(var(--primary-gradient))',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          light: 'hsl(var(--muted-light))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  variants: {
    scrollbar: ['hover'], // Allow scrollbar styles on hover
  },
  plugins: [require('tailwindcss-animate')],
}
