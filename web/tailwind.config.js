/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      /* ---------- Colours ---------- */
      colors: {
        /* shadcn/ui REQUIRED tokens  */
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: '#282c35', 

        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',

        /* custom greys for Figma dark theme */
        bg:    '#1a1c22',   // you can use this class: bg-bg
        panel:   '#1a1c22',
        card:    '#1a1c22',

        /* accent palette */
        accentGreen: '#1fcb4f', // emerald-600
        warn:        '#f59e0b', // amber-500

        /* variable-driven colour groups (keep for shadcn) */
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        /* chart palette */
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },

        borderWidth: { DEFAULT: '1px' },
        boxShadow: { card: '0 0 0 1px hsl(var(--border))' },
      },

      fontFamily:{
        sans: ['Poppins', 'sans-serif']
      },

      /* ---------- Radius ---------- */
      borderRadius: {
        lg: '0.75rem',
      },
    },
  },

  plugins: [require('tailwindcss-animate')],
};
