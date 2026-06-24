/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds – deep blacks from the component
        'bg-primary': '#050505',      // overlay background (used with opacity in component)
        'bg-secondary': '#0c0c0c',    // main card background

        // Text – white and accent gold
        'text-primary': '#FAFAFA',    // crisp white (input text, etc.)
        'text-secondary': '#d4a843',  // gold (headings, labels, active elements)
        'text-muted': '#4D4D4D',      // muted gray (approximates white/30 on black)

        // Brand / actions – now using the single accent gold
        'accent-orange': '#d4a843',   // replaced with the main gold
        'accent-amber': '#d4a843',    // kept as gold for consistency (or could use a darker variant)

        // Glass / border – left unchanged (they work with any palette)
        'bg-glass': 'rgba(255, 255, 255, 0.04)',
        'border-glass': 'rgba(255, 255, 255, 0.06)',
      },
      boxShadow: {
        'card': '0 20px 60px rgba(0, 0, 0, 0.6)',
        'card-hover': '0 28px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(212, 168, 67, 0.06)',
        'avatar': '0 0 40px rgba(212, 168, 67, 0.08), 0 8px 32px rgba(0, 0, 0, 0.5)',
        'social-hover': '0 8px 24px rgba(212, 168, 67, 0.06)',
      },
      borderRadius: {
        'card': '18px',
        'sm': '10px',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-slide-up': 'fadeSlideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'pulse-glow': 'pulseGlow 2s infinite',
        'shimmer': 'shimmer 1.8s infinite linear',
      },
      keyframes: {
        fadeSlideUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.7 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};