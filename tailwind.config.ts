import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
        // PRD specific colors for direct use with Tailwind utilities
        'surface': 'hsl(var(--prd-surface))', // Maps to #FFFFFF
        'sidebar': 'hsl(var(--prd-sidebar-bg))', // Maps to #E9EBEC
        'primaryText': 'hsl(var(--prd-primary-text))', // Maps to #212529
        'secondaryText': 'hsl(var(--prd-secondary-text))', // Maps to #878A99
        'accentBlue': 'hsl(var(--prd-accent-blue))', // Maps to #1877F2
        'accentRed': 'hsl(var(--prd-accent-red))', // Maps to #F02849
			},
			borderRadius: {
				lg: 'var(--radius)', // 0.375rem (now same as md by default Tailwind)
				md: 'calc(var(--radius) - 2px)', // 0.375rem - 2px
				sm: 'calc(var(--radius) - 4px)'  // 0.375rem - 4px
			},
      // Spacing uses Tailwind defaults (4px scale) as per PRD.
      // Effects (shadows) use Tailwind defaults ('shadow', 'shadow-sm') as per PRD.
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
