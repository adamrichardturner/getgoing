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
      xxs: '.65rem',
      xs: '.75rem',
      xsl: '.75rem',
      sm: '0.85rem',
      sml: '0.90rem',
      md: '1rem',
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
        xxs: '320px',
        xs: '330px',
        lxs: '380px',
        sm: '640px',
        md: '800px',
        lmd: '910px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      spacing: {
        'main-open': '17rem',
        'main-closed': '1rem',
        mainTop: '10.95rem',
        catTop: '2.575rem',
        catTopMob: '1.125rem',
        burgerTop: '1rem',
        burgerBottom: '0rem',
        addTask: '1.25rem',
        upcomingTop: '4.25rem'
      },
      colors: {
        'default-color': 'var(--default-color)',
        alert: 'var(--alert)',
        header: 'var(--header)',
        drawer: 'var(--drawer)',
        darkBlue: 'var(--darkBlue)',
        adamYellow: 'var(--adamYellow)',
        'cal-today': 'var(--cal-today)',
        'cal-selected': 'var(--cal-selected)',
        completedBg: 'var(--completedBg)',
        'reverse-contrast': 'var(--reverse-contrast)',
        inputBar: 'var(--inputBar)',
        inputBarHover: 'var(--inputBarHover)',
        itemHover: 'var(--itemHover)',
        taskbar: 'var(--taskbar)',
        layout: 'var(--layout)',
        main: 'var(--main)',
        completed: 'var(--completed)',
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
