/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    fontSize: {
      xxs: '.5rem',
      xs: '.75rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem'
    },
    container: {
      center: true,
      screens: {
        md: '800px',
        lg: '1200px',
        '2xl': '1400px'
      }
    },
    extend: {
      padding: {
        '17rem': '17rem',
        '1rem': '1rem'
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '800px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      spacing: {
        'main-open': '17rem',
        'main-closed': '1rem',
        mainTop: '5rem',
        catTop: '7.9rem',
        catTopMob: '1.125rem',
        burgerTop: '4.35rem',
        burgerBottom: '.5rem',
        addTask: '1.25rem'
      },
      colors: {
        'default-color': 'var(--default-color)',
        alert: 'var(--alert)',
        header: 'var(--header)',
        drawer: 'var(--drawer)',
        completedBg: 'var(--completedBg)',
        inputBar: 'var(--inputBar)',
        inputBarHover: 'var(--inputBarHover)',
        itemHover: 'var(--itemHover)',
        layout: 'var(--layout)',
        main: 'var(--main)',
        bodyText: 'var(--bodyText)',
        task: 'var(--task)',
        itemBorder: 'var(--itemBorder)',
        btnOutline: 'var(--btnOutline)',
        subtext: 'var(--subtext)',
        btn: 'var(--btn)',
        lightest: 'var(--lightest)',
        darktask: 'var(--darktask)',
        darkest: 'var(--darkest)',
        highlight: 'var(--highlight)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        "high-contrast": 'var(--high-contrast)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
