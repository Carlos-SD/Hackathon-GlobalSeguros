import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
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
        // Colores específicos de GlobalSeguros
        "gs-blue": {
          DEFAULT: "#003087",
          50: "#e6edf7",
          100: "#ccdaef",
          200: "#99b5df",
          300: "#6690cf",
          400: "#336bbf",
          500: "#003087",
          600: "#00266c",
          700: "#001c51",
          800: "#001336",
          900: "#00091b",
        },
        "gs-red": {
          DEFAULT: "#FF0000",
          50: "#ffe6e6",
          100: "#ffcccc",
          200: "#ff9999",
          300: "#ff6666",
          400: "#ff3333",
          500: "#FF0000",
          600: "#cc0000",
          700: "#990000",
          800: "#660000",
          900: "#330000",
        },
        // Colores para los diferentes tipos de seguros
        "insurance-life": "#FF5252", // Rojo para Seguros de Vida
        "insurance-accident": "#C2185B", // Magenta para Accidentes Personales
        "insurance-pension": "#2E7D32", // Verde para Pensión Voluntaria
        "insurance-income": "#7B1FA2", // Púrpura para Rentas Voluntarias
        "insurance-annuity": "#FF8F00", // Naranja para Renta Vitalicia
        "insurance-auto": "#1976D2", // Azul para Seguro Automovilístico
        "insurance-home": "#0097A7", // Cian para Seguro de Hogar
        "insurance-health": "#388E3C", // Verde para Seguro de Salud
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
