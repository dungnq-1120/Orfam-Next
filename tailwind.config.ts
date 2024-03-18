import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      width: {
        "70p": "70%",
        "30p": "30%",
      },
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
        gray: {
          ct1: "#f2f2f6",
        },
        blue: {
          ct7: "#2d2a6e",
          ct6: "#443fad",
          ct5: "#6964c8fc",
          ct1: "#d6c9ff",
        },
        green: {
          ct5: "#96ae00",
          ct6: "#718300",
        },
        orange: {
          ct2: "#ffc6a1",
          ct1: "#ff00002b",
        },
        black: {
          ct50: "#00000080",
        },
      },
      boxShadow: {
        shadowCheck: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
        shadowRed: "0 0 0 0.25rem rgba(255, 34, 0, 0.393)",
        shadow1: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      },
      zIndex: {
        "9999": "9999",
        "5xl": "99999",
        "6xl": "999999",
      },
      borderWidth: {
        "1": "1px",
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
      backgroundImage: {
        boxes: "url('https://orfarm-next-js.vercel.app/assets/img/slider/shape-bg.jpg')",
        banner: "url('https://orfarm-next-js.vercel.app/assets/img/slider/shape-bg-2.jpg')",
        banner_about: "url('https://orfarm-next-js.vercel.app/assets/img/banner/about-bg-1.png')",
        grayBg: "url('https://orfarm-next-js.vercel.app/assets/img/shape/choos-bg-1.svg')",
        footer: "url('https://orfarm-next-js.vercel.app/assets/img/shape/footer-shape-1.svg')",
      },
      screens: {
        s: { max: "350px" },
        xs: { max: "428px" },
        sm: { max: "640px" },
        csm: { max: "700px" },
        md: { max: "768px" },
        mdd: { max: "822px" },
        nm: { max: "937px" },
        lg: { max: "1080px" },
        xl: { max: "1280px" },
        xxl: { max: "1536px" },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
